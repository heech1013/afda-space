const router = require('express').Router();

const commentIndex = require('./commentIndex');
const show = require('./show');
const index = require('./index');

router.get('/:id/comment', commentIndex);
router.get('/:id', show);
router.get('/', index);

module.exports = router;