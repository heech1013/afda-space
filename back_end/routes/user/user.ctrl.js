const router = require('express').Router();

router.use('/:id/profile', require('./profile/user.profile.ctrl'));
router.use('/:id/diagnosis', require('./diagnosis/user.diagnosis.ctrl'));
router.use('/:id/symptom', require('./symptom/user.symptom.ctrl'));
router.use('/:id/medicine', require('./medicine/user.medicine.ctrl'));
router.use('/:id/medicineDosageData', require('./medicineDosageData/user.medicineDosageData.ctrl'));

module.exports = router;