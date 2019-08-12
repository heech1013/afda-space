const { Station, User, Profile } = require('../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const forum = await Station.findOne({
      attributes: ['title', 'body'], where: { id },
      include: [
        {
          model: User, as: 'RegisteringStation', attributes: ['id'],
          include: [{ model: Profile, as: 'Profile', attributes: ['nick'] }]
        }
      ]
    });

    return res.status(200).json({ forum });
  } catch (e) {
    next(e);
  }
};

module.exports = show;