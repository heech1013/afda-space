const router = require('express').Router();

router.use('/post', require('./post/post.ctrl'));

module.exports = router;