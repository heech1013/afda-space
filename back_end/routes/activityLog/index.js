const { ActivityLog, User, Profile, Diagnosis, Medicine, Symptom } = require('../../models');
const format = require('date-fns/format');

const index = async (req, res, next) => {
  const { type, userId } = req.query;
  const whereObj = (type === 'profile') ? { fkUserId: userId } : {};

  try {
    const activitiesBefore = await ActivityLog.findAll({
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
      limit: 100
    });

    let activities = [];
    
    await (  // Promise 리턴 함수 + 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for (let obj of activitiesBefore) {
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

          activities.push({
            "type": obj.type,
            "target": target,
            "targetId": targetId,
            "userId": obj.user.id,
            "nick": obj.user.profile.nick,
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd HH:mm"),
          });
        }
        resolve();
      })
    )()
    
    return res.status(200).json({ activities });
  } catch (e) {
    next(e);
  }
}

module.exports = index;