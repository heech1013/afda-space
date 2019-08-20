const router = require('express').Router({ mergeParams: true });

const index = require('./index');

router.get('/', index);

module.exports = router;