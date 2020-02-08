const { sequelize, MedicineEvaluationData, MedicinePurposeData, MedicineSideEffectsData } = require('../../models')

const destroy = async (req, res, next) => {
  try {
    /** REST API와는 맞지 않게 param id가 medicineEvaluation의 PK id가 아님.
     * ProfileContentList.js로부터 purposeId(MedicinePurposeData의 PK id)를 전달받아
      fkUserId, fkMedicineId를 조회 후 관련 데이터를 제거/
     */
    const { id } = req.params;  // MedicinePurposeData의 PK id

    /** (mvp) 하나의 처방약에 대해 하나의 처방 목적만 등록 가능하다.
     * 하나의 처방약에 대해 하나의 평가만 등록 가능하다.
     * (mvp) 하나의 처방약에 대해 하나의 부작용만 등록 가능하다(평가를 진행한 후여도 부작용을 등록하지 않은 경우 없을 수 있다).
     * 처방 목적 데이터를 통해 user id와 medicine id를 조회하면 해당 사용자, 처방약에 대해
      각 한 개씩의 purpose, evaluation, side effect 데이터를 조회할 수 있다. */
    const registeredPurposeData = await MedicinePurposeData.findOne({
      attributes: ['fkUserId', 'fkMedicineId'], where: { id }
    });
    const { fkUserId, fkMedicineId } = registeredPurposeData;

    const transaction = await sequelize.transaction();
    try {
      await MedicineEvaluationData.destroy({ where: { fkUserId, fkMedicineId }}, { transaction });
      /** [평가하기]에서 입력되는 'perceivedEffectiveness' 항목만 null로 수정. */
      await MedicinePurposeData.update({ perceivedEffectiveness: null }, { where: { fkUserId, fkMedicineId }, transaction });
      /** side effect의 경우 있든 없든 삭제 */
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