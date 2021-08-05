const { MedicineDosageData, ReasonOfStop, ActivityLog } = require('../../../models');
const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
const radioHandler = require('../../../middleware/maker/radioHandler');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;

    nullStringHandler(data);

    let {
      contentId: fkMedicineId, takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage, additionalDosageCount, switchRadio, switchTo, dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency, stopTakingYear, stopTakingMonth, stopTakingDay, noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText
    } = data;

    if (!fkMedicineId) return next(CustomError('InternalServerError', 'MedicineId is missing.'));

    takingStatus = radioHandler(takingStatus);
    switchRadio = radioHandler(switchRadio);
    dosageDifferRadio = radioHandler(dosageDifferRadio);

    if (takingStatus) {
      stopTakingYear, stopTakingMonth, stopTakingDay, reasonText = null;
      noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other = false;
    }
    if (!additionalDosage) {
      additionalDosageCount = null;
    }
    if (!switchRadio) {
      switchTo = null;
    }
    if (!dosageDifferRadio) {
      firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency = null;
    }
    if (!other) {
      reasonText = null;
    }

    await MedicineDosageData.create({
      fkUserId,
      fkMedicineId,
      takingStatus,
      recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage: additionalDosageCount,
      switchRadio, switchTo,
      dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency,
      stopTakingYear, stopTakingMonth, stopTakingDay,
      reasonOfStop: { noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText }
    }, {
      include: [{ model: ReasonOfStop }]
    });
    
    await ActivityLog.create({ type: 'REGISTER_MEDICINE_DOSAGE', fkMedicineId, fkUserId });

    return res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = create;