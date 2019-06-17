const router = require('express').Router();

const profile = require('./profile');

router.get('/:id/profile', profile);

module.exports = router;