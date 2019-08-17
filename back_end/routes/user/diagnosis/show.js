const { Diagnosis, DiagnosisData } = require('../../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await DiagnosisData.findOne({
      attributes: ['firstNoticeYear', 'firstNoticeMonth', 'firstNoticeDay', 'firstNoticeUnaware', 'firstNoticeUnknown', 'firstDiagnosedYear', 'firstDiagnosedMonth', 'firstDiagnosedDay', 'firstDiagnosedUnaware', 'firstDiagnosedUnknown'],
      where: { fkUserId: id },
      include: [{ model: 'Diagnosis', as: 'RegisteredDiagnosisData', attributes: ['nameKr'] }]
    });

    return res.json({
      content: {
        diagnosisName: content.nameKr,
        ageAtFirstSymptom
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = show;