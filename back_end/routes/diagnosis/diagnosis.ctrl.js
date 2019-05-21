const router = require('express').Router();

const index = require('./index');
const show = require('./show');

router.get('/:id/summary', show);
router.get('/', index);

module.exports = router;