require('dotenv').config();
const { User, Profile } = require('../../models');

const join = async (req, res, next) => {
  try {
    const { authId, nick, sex, age } = req.body;
    const user = await User.create({ authId, Profile: { nick, sex, age }}, { include: [{ model: Profile, as: 'Profile' }]});
    const token = await jwt.sign(
      {
        id: user.id,
        userType: user.userType
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: '12h',
        issuer: '아프다스페이스.com'
      }
    );
    return res.status(201).json({ auth: { authId: null, join: true, token }});
  } catch (e) {
    next(e);
  }
};

module.exports = join;