const router = require('express').Router();

router.use('/:id/profile', require('./profile/user.profile.ctrl'));

module.exports = router;