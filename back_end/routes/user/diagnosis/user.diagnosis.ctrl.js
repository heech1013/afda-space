const router = require('express').Router({ mergeParams: true });

const index = require('./index');
const create = require('./create');

router.get('/', index);
router.post('/', index);

module.exports = router;