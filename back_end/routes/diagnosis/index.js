const { Diagnosis } = require('../../models');

const index = async (req, res, next) => {
  try {
    const diagnosisList = await Diagnosis.findAll({
      attributes: ['id', 'nameKr', 'nameEn']
    });

    return res.status(200).json({ diagnosisList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;