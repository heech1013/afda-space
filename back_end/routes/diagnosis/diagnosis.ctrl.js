const router = require('express').Router();

const symptomIndex = require('./symptomIndex');
const medicineIndex = require('./medicineIndex');
const show = require('./show');
const index = require('./index');

router.get('/:id/symptom', symptomIndex);
router.get('/:id/medicine', medicineIndex);
router.get('/:id', show);
router.get('/', index);

module.exports = router;