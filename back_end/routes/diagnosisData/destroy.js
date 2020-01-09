const { DiagnosisData } = require('../../models')

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;  // DiagnosisData의 id

    await DiagnosisData.destroy({ where: { id }});
    return res.status(204).json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;