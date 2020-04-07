require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../../middleware/errorHandler/CustomError');

const { User, Profile, ActivityLog } = require('../../models');

const join = async (req, res, next) => {
  try {
    /** type이 LOCAL일 경우, authId에는 email이 담기고
     * type이 KAKAO일 경우, authId에는 카카오에서 로그인 연결 성공 후 제공하는 고유 id가 담겨있다. */
    const { type, authId, password, nick, sex, birthDate } = req.body;

    if (type === 'LOCAL') {
      const existingEmail = await User.findOne({ where: { authId, provider: 'local' }});
      if (existingEmail) return next(CustomError("BadRequest", "이미 가입된 이메일입니다."));
    }

    const existingNick = await Profile.findAll({ where: { nick }});
    if (existingNick.length) return next(CustomError("BadRequest", "이미 존재하는 닉네임입니다."));

    else {
      let user;
      if (type === 'LOCAL') {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ authId, password: hashedPassword, userType: 'patient', provider: 'local', profile: { nick, sex, birthDate }}, { include: [{ model: Profile }]});
      }
      else if (type === 'KAKAO') {
        user = await User.create({ authId, userType: 'patient', provider: 'kakao', profile: { nick, sex, birthDate }}, { include: [{ model: Profile }]});
      }
      
      const token = jwt.sign(  // Synchronously sign
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
      await ActivityLog.create({ type: 'USER_JOIN', fkUserId: user.id });
      return res.status(201).json({ logged: true, id: user.id, auth: { authId: null, token }});
    }
  } catch (e) {
    next(e);
  }
};

module.exports = join;