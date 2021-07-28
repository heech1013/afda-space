const { Sequelize, Diagnosis, Medicine, MedicinePurposeData, MedicineEvaluationData } = require('../../models');

const showDiagnosisMedicine = async (req, res, next) => {
  try {
    const { diagnosisId } = req.query;

    let chartData = {
      nameKr: '',
      medicineArr: [],
      effectMajorArr: [],
      effectModerateArr: [],
      effectSlightArr: [],
      effectNoneArr: [],
      effectCanNotTellArr: [],
      sideEffectSevereArr: [],
      sideEffectModerateArr: [],
      sideEffectMildArr: [],
      sideEffectNoneArr: [],
    };

    /** nameKr */
    const nameKr = await Diagnosis.findOne({
      attributes: ['nameKr'],
      where: { id: diagnosisId }
    });
    
    chartData.nameKr = nameKr;

    /** medicineArr */
    const descMedicinePurposeData = await Medicine.findAll({
      attributes: ['id', 'nameKr', [Sequelize.fn('COUNT', Sequelize.col('medicinePurposeData.id')), 'count']],
      include: [{
        model: MedicinePurposeData,
        attributes: [],
        where: { fkDiagnosisId: diagnosisId }  // requried: true(inner join)
      }],
      group: ['id', 'nameKr'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('medicinePurposeData.id')), 'DESC']],
    });

    chartData.medicineArr = descMedicinePurposeData.slice(0, 10).map(obj => obj.nameKr)

    /** medicine effect & side effect */
    const medicinePurposePromiseArr = []

    descMedicinePurposeData.slice(0, 10).forEach(obj => medicinePurposePromiseArr.push(
      MedicinePurposeData.count({ where: {'fkMedicineId': obj.id, 'perceivedEffectiveness': 5 }}),
      MedicinePurposeData.count({ where: {'fkMedicineId': obj.id, 'perceivedEffectiveness': 4 }}),
      MedicinePurposeData.count({ where: {'fkMedicineId': obj.id, 'perceivedEffectiveness': 3 }}),
      MedicinePurposeData.count({ where: {'fkMedicineId': obj.id, 'perceivedEffectiveness': 2 }}),
      MedicinePurposeData.count({ where: {'fkMedicineId': obj.id, 'perceivedEffectiveness': 1 }}),
      MedicineEvaluationData.count({ where: {'fkMedicineId': obj.id, 'sideEffects': 5 }}),
      MedicineEvaluationData.count({ where: {'fkMedicineId': obj.id, 'sideEffects': 4 }}),
      MedicineEvaluationData.count({ where: {'fkMedicineId': obj.id, 'sideEffects': 3 }}),
      MedicineEvaluationData.count({ where: {'fkMedicineId': obj.id, 'sideEffects': 2 }}),
    ))

    const medicinePurposeResultArr = await Promise.all(medicinePurposePromiseArr)

    for (let i = 0; i < medicinePurposeResultArr.length / 9; i += 9) {
      chartData.effectMajorArr.push(medicinePurposeResultArr[i])
      chartData.effectModerateArr.push(medicinePurposeResultArr[i+1])
      chartData.effectSlightArr.push(medicinePurposeResultArr[i+2])
      chartData.effectNoneArr.push(medicinePurposeResultArr[i+3])
      chartData.effectCanNotTellArr.push(medicinePurposeResultArr[i+4])
      chartData.sideEffectSevereArr.push(medicinePurposeResultArr[i+5])
      chartData.sideEffectModerateArr.push(medicinePurposeResultArr[i+6])
      chartData.sideEffectMildArr.push(medicinePurposeResultArr[i+7])
      chartData.sideEffectNoneArr.push(medicinePurposeResultArr[i+8])
    }
    
    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisMedicine;