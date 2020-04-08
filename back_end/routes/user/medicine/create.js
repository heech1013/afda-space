const { MedicineData, ActivityLog } = require('../../../models');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    const { medicineId: fkMedicineId } = req.body;

    const existingData = await MedicineData.findAll({ where: { fkUserId, fkMedicineId }});
    if (existingData.length) return next(CustomError("BadRequest", "이미 등록한 처방약입니다."));

    else {
      await MedicineData.create({ fkUserId, fkMedicineId });
      await ActivityLog.create({ type: 'REGISTER_MEDICINE', fkMedicineId, fkUserId });
      return res.json({ success: true });
    }    
  } catch (e) {
    next(e);
  }
};

module.exports = create;