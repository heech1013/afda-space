require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const CustomError = require('../../middleware/errorHandler/CustomError');

const checkJWT = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) next(CustomError('Unauthorized', 'Not verified jwt'));
      else {
        const user = await User.findOne({ attributes: ['id'], where: { id: decoded.id }});
        if (user) return res.status(200).json({ logged: true, id: user.id });
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = checkJWT;