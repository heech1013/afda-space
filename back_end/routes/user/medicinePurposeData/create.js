const { MedicinePurposeData } = require('../../../models');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;

    let { contentId: fkMedicineId, purposeRadio, diagnosisId: fkDiagnosisId, symptomId: fkSymptomId } = data;

    /** purposeRadio: { diagnosis: false, symptom: false} 인 경우는 front 단에서 방지함. */
    if (purposeRadio.diagnosis) {  // purposeRadio: { diagnosis: true, symptom: false }
      fkSymptomId = null;
    } else if (purposeRadio.symptom) { // purposeRadio: { diagnosis: false, symptom: true }
      fkDiagnosisId = null;
    }

    await MedicinePurposeData.create({
      fkUserId, fkMedicineId, fkSymptomId, fkDiagnosisId
    });
    
    await ActivityLog.create({ type: 'REGISTER_MEDICINE_PURPOSE', fkMedicineId, fkUserId });

    return res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = create;