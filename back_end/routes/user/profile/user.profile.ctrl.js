const router = require('express').Router();

const show = require('./show');
const update = require('./update');

router.get('/', show);
router.patch('/', update);

module.exports = router;