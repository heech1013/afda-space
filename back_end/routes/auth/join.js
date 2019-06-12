require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User, Profile } = require('../../models');

const join = async (req, res, next) => {
  try {
    const { authId, nick, sex, age } = req.body;
    const user = await User.create({ authId, userType: 'patient', provider: 'kakao', Profile: { nick, sex, age }}, { include: [{ model: Profile, as: 'Profile' }]});
    const token = await jwt.sign(
      {
        id: user.id,
        userType: user.userType,
        nick: user.Profile.nick
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
        issuer: '아프다스페이스.com'
      }
    );
    return res.status(201).json({ logged: true, auth: { authId: null, token }});
  } catch (e) {
    next(e);
  }
};

module.exports = join;