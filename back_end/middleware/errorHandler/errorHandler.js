require('dotenv').config();
const errorJSON = require('./error.json');

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production' && errorJSON[err.name]) {}  // production이며 error.json에 명시된 에러일 경우 출력하지 않는다.
  else console.error(err);  // dev이거나 production인데 error.json에 명시되지 않은 에러가 발생할 경우에만 출력한다.

  const CustomError = errorJSON[err.name] || errorJSON.InternalServerError;
  if (err.message) {
    CustomError.message = err.message;
  }
  const { code, name, message } = CustomError;

  res.status(code).json({
    success: false,
    name,
    message
  });
};

module.exports = errorHandler;