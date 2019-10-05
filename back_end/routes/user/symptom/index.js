const { User, Symptom, SymptomData } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const a = await User.findOne({
      attributes: ['id'], where: { id },
      include: [{
        model: SymptomData, as: 'RegisteringSymptomData', attributes: ['id'],
        include: [{ model: Symptom, as: 'RegisteredSymptomData', attributes: ['nameKr']}]
      }]
    });

    const contents = a.RegisteringSymptomData.map((obj) => {
      return {
        id: obj.id,
        symptomName: obj.RegisteredSymptomData.nameKr
      }
    });

    return res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = index;