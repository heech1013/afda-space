const { MedicinePurposeData } = require('../../models')

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;  // MedicinePurposeData의 id

    await MedicinePurposeData.destroy({ where: { id }});
    return res.status(204).json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;