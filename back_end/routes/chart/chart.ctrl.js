const router = require('express').Router();

const showDiagnosisSummary = require('./showDiagnosisSummary');
const showDiagnosisMedicine = require('./showDiagnosisMedicine');
// const showMedicineSummary = require('');

router.get('/diagnosisSummary', showDiagnosisSummary);
router.get('/diagnosisMedicine', showDiagnosisMedicine);
// router.get('/medicineSummary', showMedicineSummary);

module.exports = router;