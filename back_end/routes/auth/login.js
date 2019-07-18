require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User, Profile } = require('../../models');

const login = async (req, res, next) => {
  const { id : authId } = req.body;
  try {
    const user = await User.findOne({ where: { authId }, include: [{ model: Profile, as: 'Profile', attributes: ['nick'] }]});
    /* 회원가입이 되어 있지 않을 경우 */
    if (!user) res.status(200).json({ logged: false, auth: { authId, token: null }});
    /* 회원가입이 되어 있는 사용자일 경우 */
    else if (user) {
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
      return res.status(200).json({ logged: true, id: user.id, auth: { authId: null, token }});
    }
  } catch (e) {
    next(e);
  }
};

module.exports = login;