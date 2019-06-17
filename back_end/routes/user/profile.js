const { User, Profile } = require('../../models');

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await User.findOne({ attributes: ['id'], where: { id }, include: [{ model: Profile, as: 'Profile', attributes: ['nick', 'sex', 'age', 'introduction']}]});
    return res.status(200).json({ profile });
  } catch (e) {
    next(e);
  }
};

module.exports = profile;