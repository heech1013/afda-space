const router = require('express').Router();

const index = require('./index');

router.get('/', index);

module.exports = router;