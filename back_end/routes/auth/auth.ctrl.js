const router = require('express').Router();

const login = require('./login');
const join = require('./join');
const checkJWT = require('./checkJWT');

router.post('/login', login)
router.post('/join', join);
router.post('/checkJWT', checkJWT);

module.exports = router;