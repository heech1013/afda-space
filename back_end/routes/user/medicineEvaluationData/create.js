const { sequelize, MedicineEvaluationData, MedicinePurposeData, MedicineSideEffectsData, ActivityLog } = require('../../../models');
const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
// const radioHandler = require('../../../middleware/maker/radioHandler');
// const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;

    /** null string('')을 모두 null로 변환해준다. */
    await nullStringHandler(data);
    
    let {
      contentId: fkMedicineId, evaluationDate, perceivedEffectiveness, sideEffects, symptomId, startNoticingWhenStartTaking, startNoticingYear, startNoticingMonth, startNoticingDay, adherence, burden, unexpectedPositiveEffects, tips, costDateUnit, cost
    } = data;

    /** 프론트로부터 입력된 척도를 숫자로 변환.
     * 1은 '알 수 없다', '말할 수 없다' 따위에 할당, 2부터 5까지 강도별로 나열하기로 합의.
     */
    if (sideEffects.none) sideEffects = 2;
    else if (sideEffects.mild) sideEffects = 3;
    else if (sideEffects.moderate) sideEffects = 4;
    else if (sideEffects.severe) sideEffects = 5;

    if (adherence.never) adherence = 2;
    else if (adherence.sometimes) adherence = 3;
    else if (adherence.usually) adherence = 4;
    else if (adherence.always) adherence = 5;
  
    if (burden.notAtAll) burden = 2;
    else if (burden.aLittle) burden = 3;
    else if (burden.somewhat) burden = 4;
    else if (burden.very) burden = 5;
    
    if (unexpectedPositiveEffects.yes) unexpectedPositiveEffects = true;
    else if (unexpectedPositiveEffects.no) unexpectedPositiveEffects = false;
  
    if (perceivedEffectiveness.canNotTell) perceivedEffectiveness = 1;
    else if (perceivedEffectiveness.none) perceivedEffectiveness = 2;
    else if (perceivedEffectiveness.slight) perceivedEffectiveness = 3;
    else if (perceivedEffectiveness.moderate) perceivedEffectiveness = 4;
    else if (perceivedEffectiveness.major) perceivedEffectiveness = 5;
    
    if (startNoticingWhenStartTaking.yes) startNoticingWhenStartTaking = true;
    else if (startNoticingWhenStartTaking.no) startNoticingWhenStartTaking = false;
    

    const transaction = await sequelize.transaction();
    try {
      await MedicineEvaluationData.create({
        fkUserId, fkMedicineId,
        evaluationDate, sideEffects, adherence, burden, unexpectedPositiveEffects, tips, costDateUnit, cost
      }, { transaction });

      /** 이전에 등록한 처방 목적 데이터를 조회
       * mvp에서는 처방약 하나 당 하나의 처방 목적만 등록할 수 있으므로 하나의 데이터만 조회된다.
       */
      const registeredPurposeData = await MedicinePurposeData.findOne({
        attributes: ['fkDiagnosisId', 'fkSymptomId'], where: { fkUserId, fkMedicineId }
      });

      /** 이전에 처방 목적을 진단명으로 설정했는지, 증상으로 설정했는지에 따라 데이터를 입력할 위치를 결정 */
      let whereObj = { fkUserId, fkMedicineId };
      if (registeredPurposeData.fkDiagnosisId) {
        whereObj["fkDiagnosisId"] = registeredPurposeData.fkDiagnosisId;
      } else if (registeredPurposeData.fkSymptomId) {
        whereObj["fkSymptomId"] = registeredPurposeData.fkSymptomId;
      }

      await MedicinePurposeData.update({ perceivedEffectiveness }, { where: whereObj, transaction});

      /** 부작용을 mild 이상으로 응답한 경우 */
      if ((sideEffects == 3) || (sideEffects == 4) || (sideEffects == 5)) {
        await MedicineSideEffectsData.create({
          fkSymptomId: symptomId, fkUserId, fkMedicineId,
          startNoticingWhenStartTaking, startNoticingYear, startNoticingMonth, startNoticingDay
        }, { transaction });
      }

      await ActivityLog.create({ type: 'REGISTER_MEDICINE_EVALUATION', target: fkMedicineId, fkUserId });

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