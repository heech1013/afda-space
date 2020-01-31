const router = require('express').Router();

const destroy = require('./destroy');

router.delete('/:id', destroy);

module.exports = router;