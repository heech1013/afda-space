const { User, Profile } = require('../../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await User.findOne({ attributes: ['id'], where: { id }, include: [{ model: Profile, as: 'Profile', attributes: ['nick', 'sex', 'age', 'introduction']}]});
    return res.status(200).json({ profile: { nick: profile.Profile.nick, sex: profile.Profile.sex, age: profile.Profile.age, introduction: profile.Profile.introduction } });
  } catch (e) {
    next(e);
  }
};

module.exports = show;