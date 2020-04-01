const router = require('express').Router();

const index = require('./index.js');

router.get('/', index);

module.exports = router;