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
    const radioHandler = (val) => {    
      if (val.yes) {
        val = true;
        return val;
      }
      else if (val.no || (!val.yes && !val.no)) {
        val = false;
        return val;
      }
    }
    takingStatus = radioHandler(takingStatus);
    switchRadio = radioHandler(switchRadio);
    dosageDifferRadio = radioHandler(dosageDifferRadio);

    /** */
    if (!takingStatus) {
      stopTakingYear, stopTakingMonth, stopTakingDay, reasonText = null;
      noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other = false;
    }
    /** */
    if (!additionalDosage) {
      additionalDosageCount = null;
    }
    /** */
    if (!switchRadio) {
      switchTo = null;
    }
    /** */
    if (!dosageDifferRadio) {
      firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency = null;
    }


    console.log("fkMedicineId: ", fkMedicineId, '\n', "takingStatus: ", takingStatus, '\n', "recentTakingYear: ", recentTakingYear, '\n', "recentTakingMonth: ", recentTakingMonth, '\n', "recentTakingDay: ", recentTakingDay, '\n', "dosageCount: ", dosageCount, '\n', "dosageMg: ", dosageMg, '\n', "dosageFrequency: ", dosageFrequency, '\n', "additionalDosage: ", additionalDosage, '\n', "additionalDosageCount: ", additionalDosageCount, '\n', "switchRadio: ", switchRadio, '\n', "switchTo: ", switchTo, '\n', "dosageDifferRadio: ", dosageDifferRadio, '\n', "firstTakingYear: ", firstTakingYear, '\n', "firstTakingMonth: ", firstTakingMonth, '\n', "firstTakingDay: ", firstTakingDay, '\n', "initialDosageCount: ", initialDosageCount, '\n', "initialDosageMg: ", initialDosageMg, '\n', "initialDosageFrequency: ", initialDosageFrequency, '\n', "stopTakingYear: ", stopTakingYear, '\n', "stopTakingMonth: ", stopTakingMonth, '\n', "stopTakingDay: ", stopTakingDay, '\n', "noEffect: ", noEffect, '\n', "expensive: ", expensive, '\n', "personalResearch: ", personalResearch, '\n', "doctorAdvice: ", doctorAdvice, '\n', "sideEffect: ", sideEffect, '\n', "courseDone: ", courseDone, '\n', "other: ", other, '\n', "reasonText: ", reasonText, '\n');

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

    return res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = create;