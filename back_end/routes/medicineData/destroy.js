const { sequelize, MedicineData, MedicineDosageData, MedicineEvaluationData, MedicinePurposeData, MedicineSideEffectsData } = require('../../models')

const destroy = async (req, res, next) => {
  try {

    const { id } = req.params;  // MedicineData의 PK id

    /** MedicineData의 PK id를 통해 fkUserId, fkMedicineId를 조회한다.
     * fkUserId, fkMedicineId를 통해 원하는 Dosage, Evaluation, Purpose, Side effect 데이터들을 조회/삭제할 수 있다.
     * 하나의 처방약에 대해 하나의 복용량만 등록 가능하다.
     * (mvp) 하나의 처방약에 대해 하나의 처방 목적만 등록 가능하다.
     * 하나의 처방약에 대해 하나의 평가만 등록 가능하다.
     * (mvp) 하나의 처방약에 대해 하나의 부작용만 등록 가능하다(평가를 진행한 후여도 부작용을 등록하지 않은 경우 없을 수 있다).
     */
    const registeredMedicineData = await MedicineData.findOne({
      attributes: ['fkUserId', 'fkMedicineId'], where: { id }
    });
    const { fkUserId, fkMedicineId } = registeredMedicineData;

    const transaction = await sequelize.transaction();
    try {
      await MedicineData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });
      await MedicineDosageData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });
      await MedicineEvaluationData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });
      await MedicinePurposeData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });
      await MedicineSideEffectsData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });

      await transaction.commit();
      return res.status(204).json({ success: true });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;