const router = require('express').Router();

router.use('/auth', require('./auth/auth.ctrl'));
router.use('/user', require('./user/user.ctrl'));
router.use('/newspeed', require('./newspeed/newspeed.ctrl'));
router.use('/diagnosis', require('./diagnosis/diagnosis.ctrl'));
router.use('/diagnosisData', require('./diagnosisData/diagnosisData.ctrl'));
router.use('/symptom', require('./symptom/symptom.ctrl'));
router.use('/symptomData', require('./symptomData/symptomData.ctrl'));
router.use('/medicine', require('./medicine/medicine.ctrl'));
router.use('/medicineData', require('./medicineData/medicineData.ctrl'));
router.use('/medicineDosageData', require('./medicineDosageData/medicineDosageData.ctrl'));
router.use('/medicinePurposeData', require('./medicinePurposeData/medicinePurposeData.ctrl'));
router.use('/medicineEvaluationData', require('./medicineEvaluationData/medicineEvaluationData.ctrl'));
router.use('/chart', require('./chart/chart.ctrl'));
router.use('/center', require('./center/center.ctrl'));
router.use('/station', require('./station/station.ctrl'));

module.exports = router;