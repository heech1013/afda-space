require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../../middleware/errorHandler/CustomError');

const { User, Profile } = require('../../models');

const join = async (req, res, next) => {
  try {
    const { authId, nick, sex, birthDate } = req.body;
    const existingNick = await Profile.findAll({ where: { nick }});
    if (existingNick.length) next(CustomError("BadRequest", "이미 존재하는 닉네임입니다."));
    else {
      const user = await User.create({ authId, userType: 'patient', provider: 'kakao', profile: { nick, sex, birthDate }}, { include: [{ model: Profile }]});
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
      return res.status(201).json({ logged: true, id: user.id, auth: { authId: null, token }});
    }
  } catch (e) {
    next(e);
  }
};

module.exports = join;