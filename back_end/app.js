require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const { sequelize } = require('./models');
const apiController = require('./routes/api.ctrl');
const CustomError = require('./middleware/errorHandler/CustomError');
const errorHandler = require('./middleware/errorHandler/errorHandler');

const app = express();

sequelize.sync();

process.env.NODE_ENV === 'production' ?
  app.use(morgan('combined')) && app.use(helmet())
  // : app.use(morgan('dev'));
  : app.use(morgan('combined'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiController);

app.use((_, __, next) => {
  next(CustomError('NotFound'));
});
app.use(errorHandler);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

  module.exports = app;