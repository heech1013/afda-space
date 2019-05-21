const router = require('express').Router();

router.use('/post', require('./post/post.ctrl'));
router.use('/diagnosis', require('./diagnosis/diagnosis.ctrl'));
router.use('/medicine', require('./medicine/medicine.ctrl'));

module.exports = router;