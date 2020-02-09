const router = require('express').Router();

const show = require('./show');
const index = require('./index');

router.get('/:id', show);
router.get('/', index);

module.exports = router;