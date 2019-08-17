const router = require('express').Router();

router.use('/:id/profile', require('./profile/user.profile.ctrl'));
router.use('/:id/diagnosis', require('./diagnosis/user.diagnosis.ctrl'));

module.exports = router;