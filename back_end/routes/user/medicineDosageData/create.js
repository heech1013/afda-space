const { MedicineDosageData, ReasonOfStop } = require('../../../models');
const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;

    /** ''을 null로 바꾸는 작업 */
    await nullStringHandler(data);

    let {
      contentId: fkMedicineId, takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage, additionalDosageCount, switchRadio, switchTo, dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency, stopTakingYear, stopTakingMonth, stopTakingDay, noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText
    } = data;

    if (!fkMedicineId) return next(CustomError('InternalServerError', 'MedicineId is missing.'));

    /** */
    if (takingStatus.no) {
      stopTakingYear, stopTakingMonth, stopTakingDay, reasonText = null;
      noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other = false;
    }
    /** */
    if (!additionalDosage) {
      additionalDosageCount = null;
    }
    /** */
    if (switchRadio.no) {
      switchTo = null;
    }
    /** */
    if (dosageDifferRadio.no) {
      firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency = null;

    }

    await MedicineDosageData.create({
      fkUserId,
      fkMedicineId,
      takingStatus,
      recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage: additionalDosageCount,
      switchRadio, switchTo,
      dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency,
      stopTakingYear, stopTakingMonth, stopTakingDay,
      ReasonOfStop: { noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText }
    }, {
      include: [{ model: ReasonOfStop, as: 'ReasonOfStop'}]
    });
  } catch (e) {
    next(e);
  }
}

module.exports = create;