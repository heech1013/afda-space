const { Sequelize, Station, StationComment } = require('../../models');

const index = async (req, res, next) => {
  try {
    const stationList = await Station.findAll({
      /** 왜 diagnosisData는 diagnosisData고 stationComment는 stationComments죠? */
      attributes: ['id', 'title', 'createdAt', [Sequelize.fn('COUNT', Sequelize.col('stationComments.id')), 'count']],
      include: [{
        model: StationComment,
        attributes: []
      }],
      group: ['id', 'title'],
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ stationList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;