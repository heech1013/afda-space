require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const login = async (req, res, next) => {
  const { id : authId } = req.body;
  try {
    const user = await User.findOne({ where: { authId }});
    if (!user) res.status(200).json({ auth: { authId, join: false, token: null }});
    else if (user) {
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
      return res.status(200).json({ auth: { authId: null, join: true, token }});
    }
  } catch (e) {
    next(e);
  }
};

module.exports = login;