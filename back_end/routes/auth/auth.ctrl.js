const router = require('express').Router();

const login = require('./login');
const join = require('./join');

router.post('/login', login)
router.post('/join', join);

module.exports = router;