const { User, Profile } = require('../../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await User.findOne({ attributes: ['id'], where: { id }, include: [{ model: Profile, attributes: ['nick', 'sex', 'birthDate', 'introduction']}]});
    const age = new Date().getFullYear() - profile.profile.birthDate.getFullYear() + 1;
    return res.status(200).json({ profile: { nick: profile.profile.nick, sex: profile.profile.sex, age, introduction: profile.profile.introduction } });
  } catch (e) {
    next(e);
  }
};

module.exports = show;