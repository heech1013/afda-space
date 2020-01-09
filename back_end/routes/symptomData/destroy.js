const { SymptomData } = require('../../models')

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;  // SymptomData의 id

    await SymptomData.destroy({ where: { id }});
    return res.status(204).json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;