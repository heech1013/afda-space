const router = require('express').Router({ mergeParams: true });

const create = require('./create');

router.post('/', create);

module.exports = router;