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

    const newspeed = [...post, ...activityLog].map(obj => {
      const {
        // common fields
        id,
        user,
        createdAt,
        // fields of post
        body,
        postComments,
        // fields of activityLog
        type,
        diagnosis,
        medicine,
        symptom,
      } = obj

      if (obj.type) { // activityLog have `type` field
        return {
          peedType: "POST",
          postId: id,
          userId: user.id,
          nick: user.profile.nick,
          body,
          postComments,
          createdAt: format(createdAt, "yyyy-MM-dd HH:mm")
        }
      } else {
        let target, targetId

        switch (type) {
          case 'REGISTER_DIAGNOSIS':
            target = diagnosis.nameKr
            targetId = diagnosis.id
            break
          case 'REGISTER_MEDICINE':
          case 'REGISTER_MEDICINE_DOSAGE':
          case 'REGISTER_MEDICINE_PURPOSE':
          case 'REGISTER_MEDICINE_EVALUATION':
            target = medicine.nameKr
            targetId = medicine.id
            break
          case 'REGISTER_SYMPTOM':
            target = symptom.nameKr
            targetId = symptom.id
            break
          default:
            break
        }

        return {
          peedType: "ACTIVITY_LOG",
          activityId : id,
          userId: user.id,
          nick: user.profile.nick,
          logType: type,
          target,
          targetId,
          createdAt: format(createdAt, "yyyy-MM-dd HH:mm"),
        }
      }
    })

    /**
     * 조건에 부합하는 게시물이 없을 때 post와 activityLog는 [], 또는 undefined의 형태를 띄지만
       []나 undefined와의 일치여부를 검사하면 제대로 동작하지 않음. (post.length === 0)의 조건을 활용해야 함.
     */
    const isLast = newspeed.length ? false : true;
    const lastPostId = post.length && post[post.length - 1].id;
    const lastActivityId = activityLog.length && activityLog[activityLog.length - 1].id;

    // synchronized sort
    newspeed.sort((preObj, postObj) => {
      return compareDesc(new Date(preObj.createdAt), new Date(postObj.createdAt));
    })

    return setTimeout(
      () => res.status(200).json({ newspeed, isLast, lastPostId, lastActivityId }),
      500
    );
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