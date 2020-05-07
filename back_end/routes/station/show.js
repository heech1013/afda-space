const { Station, User, Profile } = require('../../models');
const format = require('date-fns/format');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stationBefore = await Station.findOne({
      attributes: ['title', 'body', 'createdAt'], where: { id },
      include: [{
        model: User, attributes: ['id'],
        include: [{ model: Profile, attributes: ['nick'] }]
      }]
    });

    const station = {
      "title": stationBefore["title"],
      "body": stationBefore["body"],
      "createdAt": format(stationBefore["createdAt"], "yyyy-MM-dd"),  //  HH:mm
      "user": stationBefore["user"]
    };

    return res.status(200).json({ station });
  } catch (e) {
    next(e);
  }
};

module.exports = show;