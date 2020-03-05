const router = require('express').Router();

const commentIndex = require('./commentIndex');
const create = require('./create');
const show = require('./show');
const index = require('./index');

router.get('/:id/comment', commentIndex);
router.get('/:id', show);
router.get('/', index);
router.post('/', create);

module.exports = router;