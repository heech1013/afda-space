const { MedicineData } = require('../../../models');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    const { medicineId: fkMedicineId } = req.body;

    await MedicineData.create({ fkUserId, fkMedicineId });
    return res.json({ success: true });

  } catch (e) {
    next(e);
  }
};

module.exports = create;