const { MedicineDosageData } = require('../../models')

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;  // MedicineDosageData의 id

    await MedicineDosageData.destroy({ where: { id }});
    return res.status(204).json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;