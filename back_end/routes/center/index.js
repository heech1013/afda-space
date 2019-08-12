const { Sequelize, Center, CenterComment } = require('../../models');

const index = async (req, res, next) => {
  try {
    const forumList = await Center.findAll({
      attributes: ['id', 'si', 'gu', 'centerName', 'doctorName', [Sequelize.fn('COUNT', Sequelize.col('RegisteredCenterComment.id')), 'count']],
      include: [
        {
          model: CenterComment, as: 'RegisteredCenterComment', attributes: []  // attributes에 빈 배열을 할당하는 것이 중요.
        }
      ],
      group: ['id']
    })

    return res.status(200).json({ forumList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;

// https://stackoverflow.com/questions/37817808/counting-associated-entries-with-sequelize