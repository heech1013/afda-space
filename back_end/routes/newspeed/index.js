const { Sequelize, Post, PostComment, ActivityLog, User, Profile, Diagnosis, Medicine, Symptom } = require('../../models');
const format = require('date-fns/format');
const compareDesc = require('date-fns/compareDesc');

const index = async (req, res, next) => {
  const { Op } = Sequelize;
  /**
   * @userId : 'undefined' if for default newspeed, otherwise(user profile newspeed) userId integer
   * @lastPostId @lastActivityId : 'null' when loading newspeed at first, after then have some id value.
   */
  const { userId, lastPostId, lastActivityId } = req.query;
  
  let postWhereObj = {}, activityWhereObj = {};
  
  (userId !== 'undefined') && (
    postWhereObj["fkUserId"] = userId,
    activityWhereObj["fkUserId"] = userId
  );
  (lastPostId !== 'null') && (
    postWhereObj["id"] = {
      [Op.lt] : lastPostId
    }
  );
  (lastActivityId !== 'null') && (
    activityWhereObj["id"] = {
      [Op.lt] : lastActivityId
    }
  );

  console.log(`
    postWhereObj:
    ${JSON.stringify(postWhereObj)}
    ===
    activityWhereObj:
    ${JSON.stringify(activityWhereObj)}
  `)

  try {
    const post = await Post.findAll({
      /** subQuery option
       * (not documented in sequelize docs but in sequelize source code)
       * (default: true)
       * when false, not subqueried at FROM ~ (which can cause unknown column error)
       * (reference at bottom of source code)
       */
      subQuery: false,
      attributes: ['id', 'body', 'createdAt'],
      include: [
        {
          model: User, attributes: ['id'],
          include: [{ model: Profile, attributes: ['nick'] }]
        },
        {
          model: PostComment, attributes: ['body', 'createdAt'],
          include: [{
              model: User, attributes: ['id'],
              include: [{ model: Profile, attributes: ['nick'] }]
          }]
        }
      ],
      where: postWhereObj,
      order: [['createdAt', 'DESC']],
      limit: 8  // test need
    });

    const activityLog = await ActivityLog.findAll({
      attributes: ['id', 'type', 'createdAt'],
      include: [
        {
          model: User, attributes: ['id'],
          include: [{ model: Profile, attributes: ['nick'] }]
        },
        { model: Diagnosis, attributes: ['id', 'nameKr']},
        { model: Medicine, attributes: ['id', 'nameKr']},
        { model: Symptom, attributes: ['id', 'nameKr']}
      ],
      where: activityWhereObj,
      order: [['createdAt', 'DESC']],
      limit: 15  // test need
    });

    let newspeed = [];
    
    await (  // Promise 리턴 함수 + 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        // post handling
        for (let obj of post) {
          newspeed.push({
            "peedType": "POST",
            "postId": obj.id,
            "userId": obj.user.id,
            "nick": obj.user.profile.nick,
            "body": obj.body,
            "postComments": obj.postComments,  // comment array
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd HH:mm")
          });
        }

        // activityLog handling
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
            "activityId" : obj.id,
            "userId": obj.user.id,
            "nick": obj.user.profile.nick,
            "logType": obj.type,
            "target": target,
            "targetId": targetId,
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd HH:mm"),
          });
        }

        resolve();
      })
    )()

    const isLast = newspeed.length ? false : true;
    const lastPostId = post && post[post.length - 1].id;
    const lastActivityId = activityLog && activityLog[activityLog.length - 1].id;

    // synchronized sort
    newspeed.sort((preObj, postObj) => {
      return compareDesc(new Date(preObj.createdAt), new Date(postObj.createdAt));
    })

    return res.status(200).json({ newspeed, isLast, lastPostId, lastActivityId });
  } catch (e) {
    next(e);
  }
}

module.exports = index;

/** subQuery: true(default) version query */
// 'SELECT 
//   `post`.*, 
//   `user`.`id` AS `user.id`,
//   `postComments`.`id` AS `postComments.id`, 
//   `postComments`.`body` AS `postComments.body`, 
//   `postComments->user`.`id` AS `postComments.user.id`, 
//   `postComments->user->profile`.`id` AS `postComments.user.profile.id`, 
//   `postComments->user->profile`.`nick` AS `postComments.user.profile.nick` 
// FROM (
//   SELECT
//     `post`.`id`, `post`.`body`, `post`.`createdAt` 
//   FROM `posts` AS `post` 
//   ORDER BY `post`.`createdAt` DESC LIMIT 8
// ) AS `post`
//   LEFT OUTER JOIN `users` AS `user` 
//     ON `post`.`fkUserId` = `user`.`id`  /* errored point - unknown columns post.fkUserId */
//   LEFT OUTER JOIN `postComments` AS `postComments`
//     ON `post`.`id` = `postComments`.`fkPostId`
//   LEFT OUTER JOIN `users` AS `postComments->user`
//     ON `postComments`.`fkUserId` = `postComments->user`.`id`
//   LEFT OUTER JOIN `profiles` AS `postComments->user->profile` 
//     ON `postComments->user`.`id` = `postComments->user->profile`.`fkUserId` ORDER BY `post`.`createdAt` DESC;'

/** subQuery: false version query */
// SELECT 
//   `post`.`id`, `post`.`body`, `post`.`createdAt`, `user`.`id` AS `user.id`, `user->profile`.`id` AS `user.profile.id`, `user->profile`.`nick` AS `user.profile.nick`, `postComments`.`id` AS `postComments.id`, `postComments`.`body` AS `postComments.body`, `postComments->user`.`id` AS `postComments.user.id`, `postComments->user->profile`.`id` AS `postComments.user.profile.id`, `postComments->user->profile`.`nick` AS `postComments.user.profile.nick` 
// FROM `posts` AS `post` 
//   LEFT OUTER JOIN `users` AS `user` 
//     ON `post`.`fkUserId` = `user`.`id` 
//   LEFT OUTER JOIN `profiles` AS `user->profile` 
//     ON `user`.`id` = `user->profile`.`fkUserId`
//   LEFT OUTER JOIN `postComments` AS `postComments`
//     ON `post`.`id` = `postComments`.`fkPostId` 
//   LEFT OUTER JOIN `users` AS `postComments->user`
//     ON `postComments`.`fkUserId` = `postComments->user`.`id`
//   LEFT OUTER JOIN `profiles` AS `postComments->user->profile` 
//     ON `postComments->user`.`id` = `postComments->user->profile`.`fkUserId` 
//   ORDER BY `post`.`createdAt` DESC LIMIT 8;