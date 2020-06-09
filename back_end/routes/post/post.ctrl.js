const router = require('express').Router();

const commmentCreate = require('./commentCreate');
const create = require('./create');

router.post('/:id/comment', commmentCreate);
router.post('/', create);

module.exports = router;