const { User, Symptom, SymptomData } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const a = await User.findOne({
      attributes: ['id'], where: { id },
      include: [{
        model: SymptomData, attributes: ['id'],
        include: [{ model: Symptom, attributes: ['nameKr']}]
      }]
    });

    const contents = a.symptomData.map((obj) => {
      return {
        id: obj.id,
        symptomName: obj.symptom.nameKr
      }
    });

    return res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = index;