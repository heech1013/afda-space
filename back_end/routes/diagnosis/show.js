const { Diagnosis } = require('../../models');

const show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const content = await Diagnosis.findOne({
      attributes: ['id', 'nameKr', 'nameEn', 'description'],
      where: { id }
    });
    return res.status(200).json({ content });
  } catch (e) {
    next(e);
  }
}

module.exports = show;