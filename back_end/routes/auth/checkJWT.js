require('dotenv').config();
const jwt = require('jsonwebtoken');

const CustomError = require('../../middleware/errorHandler/CustomError');

const checkJWT = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) next(CustomError('Unauthorized', 'Not verified jwt'));
      else {
        return res.status(200).json({ logged: true, id: decoded.id });
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = checkJWT;