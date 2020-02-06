const { sequelize, MedicineEvaluationData, MedicinePurposeData, MedicineSideEffectsData } = require('../../../models');
// const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
// const radioHandler = require('../../../middleware/maker/radioHandler');
// const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;

    const transaction = await sequelize.transaction();
    try {

      await MedicineEvaluationData.create({

      }, { transaction });
      await MedicinePurposeData.update({}, { where: {}, transaction});
      // if () {
        await MedicineSideEffectsData.create({}, { transaction });
      // }

      await transaction.commit();
      return res.json({ success: true });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  } catch (e) {
    next(e);
  }
}

module.exports = create;

/*
contentId: 1
evaluationDate: "2020-02-11"
perceivedEffectiveness: {none: true}
sideEffects: {moderate: true}
symptomId: "2"
startNoticingWhenStartTaking: {no: true}
startNoticingYear: "1900"
startNoticingMonth: "1"
startNoticingDay: "2"
adherence: {sometimes: true}
burden: {somewhat: true}
unexpectedPositiveEffects: {no: true}
tips: "오호홓호호"
costDateUnit: 1
cost: "30000"
frontError: ""
*/