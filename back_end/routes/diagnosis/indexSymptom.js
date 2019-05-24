const { User, Diagnosis, DiagnosisData, Symptom, SymptomData } = require('../../models');
const diagnosisSymptomCleaner = require('../../middleware/cleaner/diagnosisSymptomCleaner');

const indexSymptom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedcontentList = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: DiagnosisData,
          as: 'RegisteringDiagnosisData',
          attributes: ['id'],
          include: [
            {
              model: Diagnosis,
              as: 'RegisteredDiagnosisData',
              attributes: ['id'],
              where: { id }  // 해당 diagnosis(id)에 대한 Data를 가진 User를 추출
            }
          ]
        },
        {
          model: SymptomData,
          as: 'RegisteringSymptomData',
          attributes: ['id'],
          include: [
            {
              model: Symptom,
              as: 'RegisteredSymptomData',
              attributes: ['id', 'nameKr']  // 해당 User가 보고한 symptomData들의 symptom 이름들을 추출
            }
          ]
        }
      ]
    });

    const contentList = await diagnosisSymptomCleaner(uncleanedcontentList);
    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
};

module.exports = indexSymptom;