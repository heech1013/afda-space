const { medicineDosageData, reasonOfStop } = require('../../../models');
const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (res, req, next) => {
  try {
    const { id: fkUserId } = req.params;
    const { data } = req.body;
    
    /** ''을 null로 바꾸는 작업 */
    await nullStringHandler(data);

    const {
      contentId: fkMedicineId, takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage, switchRadio, switchTo, dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency, stopTakingYear, stopTakingMonth, stopTakingDay, noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText
    } = data;

    if (!fkMedicineId) next(CustomError('InternalServerError', 'MedicineId is missing'));

    /** */
    if (takingStatus.no) {
      stopTakingYear, stopTakingMonth, stopTakingDay, reasonText = null;
      noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other = false;
    }
    /** */
    if (switchRadio.no) {
      switchTo = null;
    }
    /** */
    if (dosageDifferRadio.no) {
      firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency = null;

    }
    
    await medicineDosageData.create({
      fkUserId,
      fkMedicineId,
      takingStatus,
      recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage,
      switchRadio, switchTo,
      dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency,
      stopTakingYear, stopTakingMonth, stopTakingDay,
      reasonOfStop: { noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText }
    }, {
      include: [{ model: reasonOfStop, as: 'ReasonOfStop'}]
    });
  } catch (e) {
    next(e);
  }
}

module.exports = create;