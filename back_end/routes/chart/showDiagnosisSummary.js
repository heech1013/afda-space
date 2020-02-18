const {} = require('../../models');

const showDiagnosisSummary = async (req, res, next) => {
  try {

    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisSummary;

/** chartData = 
{
  nameKr,  // Diagnosis.nameKr
  count,  // Diagnosis(where: diagnosisId) -> count(DiagnosisData)
  ageArr,  // 
  ageAtFirstSymptomArr,
  menVal,
  womenVal,
  diagnosedVal,
  undiagnosedVal
}
 */