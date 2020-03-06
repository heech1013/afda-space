const { Station, User, Profile } = require('../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const station = await Station.findOne({
      attributes: ['title', 'body'], where: { id },
      include: [{
        model: User, attributes: ['id'],
        include: [{ model: Profile, attributes: ['nick'] }]
      }]
    });

    return res.status(200).json({ station });
  } catch (e) {
    next(e);
  }
};

module.exports = show;