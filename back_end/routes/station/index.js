const { Sequelize, Station, StationComment } = require('../../models');

const index = async (req, res, next) => {
  try {
    const forumList = await Station.findAll({
      attributes: ['id', 'title', [Sequelize.fn('COUNT', Sequelize.col('RegisteredStationComment.id')), 'count']],
      include: [
        {
          model: StationComment, as: 'RegisteredStationComment', attributes: []  // attributes에 빈 배열을 할당하는 것이 중요.
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