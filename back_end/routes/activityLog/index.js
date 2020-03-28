const { ActivityLog, User, Profile } = require('../../models');
const format = require('date-fns/format');

const index = async (req, res, next) => {
  const { type, userId } = req.query;
  const whereObj = (type === 'profile') ? { fkUserId: userId } : {} ;

  try {
    const activitiesBefore = await ActivityLog.findAll({
      attributes: ['type', 'target', 'createdAt'],
      include: [{
        model: User, attributes: ['id'],
        include: [{ model: Profile, attributes: ['nick'] }]
      }],
      where: whereObj,
      order: [['createdAt', 'DESC']]
    })

    let activities = [];
    
    await (  // Promise 리턴 함수 + 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for (let obj of activitiesBefore) {
          activities.push({
            "type": obj.type,
            "target": obj.target,
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