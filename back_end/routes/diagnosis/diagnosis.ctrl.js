const router = require('express').Router();

const show = require('./show');
const indexSymptom = require('./indexSymptom');
const index = require('./index');

router.get('/:id', show);
router.get('/:id/symptom', indexSymptom);
router.get('/', index);

module.exports = router;