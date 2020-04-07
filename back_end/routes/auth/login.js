require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../../middleware/errorHandler/CustomError');

const { User, Profile } = require('../../models');

const login = async (req, res, next) => {
  const { type, authId, password } = req.body;
  try {
    let user;

    if (type === 'KAKAO') {
      user = await User.findOne({ where: { authId, provider: 'kakao' }, include: [{ model: Profile, attributes: ['nick'] }]});
      /* 회원가입이 되어 있지 않을 경우 */
      if (!user) return res.status(200).json({ joinType: 'KAKAO', logged: false, auth: { authId, token: null }});
    }
    else if (type === 'LOCAL') {
      user = await User.findOne({ where: { authId, provider: 'local' }, include: [{ model: Profile, attributes: ['nick'] }]});
      const passwordCheck = user ? await bcrypt.compare(password, user.password) : null;
      /* 이메일이 존재하지 않거나 비밀번호가 틀린 경우 */
      if (!user || !passwordCheck) return next(CustomError("BadRequest", "이메일이 존재하지 않거나 비밀번호가 틀렸습니다."));
    }

    const token = jwt.sign(  // (sync)
      {
        id: user.id,
        userType: user.userType,
        nick: user.profile.nick
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
        issuer: '아프다스페이스.com'
      }
    );
    return res.status(200).json({ joinType: 'LOCAL', logged: true, id: user.id, auth: { authId: null, token }});
  } catch (e) {
    next(e);
  }
};

module.exports = login;