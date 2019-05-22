const { Station } = require('../../models');

const index = async (req, res, next) => {
  try {
    const stationList = await Station.findAll({
      attributes: ['id', 'title']
    });
    return res.status(200).json({ stationList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;