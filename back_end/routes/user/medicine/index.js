const { User, Medicine, MedicineEvaluationData, MedicineSideEffectsData, MedicinePurposeData, Diagnosis, Symptom } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedMedicineData = User.findOne({
      attributes: ['id'], where: { id },
      include: [
        {
          model: MedicinePurposeData, as: 'RegisteringMedicinePurposeData', attributes: ['id', 'perceivedEffectiveness'],
          include: [
            { model: Diagnosis, as: 'UsedMedicineForDiagnosis', attributes: ['nameKr']},
            { model: Symptom, as: 'UsedMedicineForSymptom', attributes: ['nameKr']},
            { model: Medicine, as: 'RegisteredMedicinePurposeData', attributes: ['nameKr']}
          ]
        },
        { model: MedicineEvaluationData, as: 'RegisteringMedicineEvaluationData', attributes: ['sideEffects']},
        {
          model: MedicineSideEffectsData, as: 'RegisteringMedicineSideEffectsData', attributes: ['id'],
          include: [{ model: Symptom, as: 'SymptomOfSideEffects', attributes: ['nameKr']}]
        }
      ]
    });

    const contents = uncleanedMedicineData.map((content) => {
      const { RegisteringMedicinePurposeData, RegisteringMedicineEvaluationData, RegisteringMedicineSideEffectsData } = uncleanedMedicineData;
      return {
        id: RegisteringMedicinePurposeData.id,
        
      }
    });

    return res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = index;