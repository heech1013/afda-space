const { Post, PostComment, ActivityLog, User, Profile, Diagnosis, Medicine, Symptom } = require('../../models');
const format = require('date-fns/format');

const index = async (req, res, next) => {
  const { userId } = req.query;  // null if for default newspeed, otherwise userId integer
  const whereObj = userId ? { fkUserId: userId } : {};

  try {
    const post = await Post.findAll({
      attributes: ['body', 'createdAt'],
      include: [
        {
          model: User, attributes: ['id'],
          include: [{ model: Profile, attributes: ['nick'] }]
        },
        {
          model: PostComment, attributes: ['body'],
          include: [{
              model: User, attributes: ['id'],
              include: [{ model: Profile, attributes: ['nick'] }]
          }]
        }
      ],
      where: whereObj,
      order: [['createdAt', 'DESC']],
      limit: 15
    })

    const activityLog = await ActivityLog.findAll({
      attributes: ['type', 'createdAt'],
      include: [
        {
          model: User, attributes: ['id'],
          include: [{ model: Profile, attributes: ['nick'] }]
        },
        { model: Diagnosis, attributes: ['id', 'nameKr']},
        { model: Medicine, attributes: ['id', 'nameKr']},
        { model: Symptom, attributes: ['id', 'nameKr']}
      ],
      where: whereObj,
      order: [['createdAt', 'DESC']],
      limit: 15
    });

    let newspeed = [];
    
    await (  // Promise 리턴 함수 + 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for (let obj of activityLog) {
          const target
            = (obj.type === 'REGISTER_DIAGNOSIS') ? obj.diagnosis.nameKr
            : ((obj.type === 'REGISTER_MEDICINE') || (obj.type === 'REGISTER_MEDICINE_DOSAGE') || (obj.type === 'REGISTER_MEDICINE_PURPOSE') || (obj.type === 'REGISTER_MEDICINE_EVALUATION')) ? obj.medicine.nameKr
            : (obj.type === 'REGISTER_SYMPTOM') ? obj.symptom.nameKr
            : null;  // USER_JOIN
          const targetId
            = (obj.type === 'REGISTER_DIAGNOSIS') ? obj.diagnosis.id
              : ((obj.type === 'REGISTER_MEDICINE') || (obj.type === 'REGISTER_MEDICINE_DOSAGE') || (obj.type === 'REGISTER_MEDICINE_PURPOSE') || (obj.type === 'REGISTER_MEDICINE_EVALUATION')) ? obj.medicine.id
              : (obj.type === 'REGISTER_SYMPTOM') ? obj.symptom.id
              : null;  // USER_JOIN

          newspeed.push({
            "peedType": "ACTIVITY_LOG",
            "logType": obj.type,
            "target": target,
            "targetId": targetId,
            "userId": obj.user.id,
            "nick": obj.user.profile.nick,
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd HH:mm"),
          });
        }

        for (let obj of post) {
          newspeed.push({
            "peedType": "POST",
            "userId": obj.user.id,
            "nick": obj.user.profile.nick,
            "body": obj.body,
            "postComment": obj.postComment,  // comment array
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd HH:mm")
          });
        }

        resolve();
      })
    )()

    // 정렬. 비동기 처리 주의.
    
    return res.status(200).json({ newspeed });
  } catch (e) {
    next(e);
  }
}

module.exports = index;