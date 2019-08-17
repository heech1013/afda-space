const router = require('express').Router({ mergeParams: true });

const show = require('./show');

router.get('/', show);

module.exports = router;