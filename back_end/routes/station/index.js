const { Sequelize, Station, StationComment } = require('../../models');
const format = require('date-fns/format');

const index = async (req, res, next) => {
  try {
    const stations = await Station.findAll({
      attributes: ['id', 'title', 'createdAt', [Sequelize.fn('COUNT', Sequelize.col('stationComments.id')), 'count']],
      include: [{
        model: StationComment,
        attributes: []
      }],
      group: ['id', 'title'],
      order: [['createdAt', 'DESC']]
    });
    
    const stationList = stations.map(station => ({
      "id": station.id,
      "title": station.title,
      "createdAt": format(station.createdAt, "yyyy-MM-dd"),
      "count": station.dataValues.count,
    }))

    return res.status(200).json({ stationList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;