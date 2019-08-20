const { Diagnosis, DiagnosisData } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedContents = await DiagnosisData.findAll({
      attributes: ['firstNoticeYear', 'firstNoticeMonth', 'firstNoticeDay', 'firstNoticeUnaware', 'firstNoticeUnknown', 'firstDiagnosedYear', 'firstDiagnosedMonth', 'firstDiagnosedDay', 'firstDiagnosedUnaware', 'firstDiagnosedUnknown'],
      where: { fkUserId: id },
      include: [{ model: Diagnosis, as: 'RegisteredDiagnosisData', attributes: ['nameKr'] }]
    });

    if (!uncleanedContents) return res.json({ contents: [] });  // []
    else {
      const contents = uncleanedContents.map((content) => {
        const dateAtFirstSymptom =
          content.firstNoticeUnaware ? '증상을 전혀 알아채지 못했음' :
            content.firstNoticeUnknown ? '알 수 없음' :
              content.firstNoticeDay ? `${firstNoticeYear}년 ${firstNoticeMonth}월 ${firstNoticeDay}일` :
                content.firstNoticeMonth ? `${firstNoticeYear}년 ${firstNoticeMonth}월}` :
                  `${firstNoticeYear}년`;
        const dateAtFirstDiagnosed =
          content.firstDiagnosedUnaware ? '진단을 받은 적은 없지만 가지고 있다고 생각한다' :
            content.firstDiagnosedUnknown ? '알 수 없음' :
              content.firstDiagnosedDay ? `${firstDiagnosedYear}년 ${firstDiagnosedMonth}월 ${firstDiagnosedDay}일` :
                content.firstDiagnosedMonth ? `${firstDiagnosedYear}년 ${firstDiagnosedMonth}월}` :
                  `${firstDiagnosedYear}년`;
        return {
          diagnosisName: content.nameKr,
          dateAtFirstSymptom,
          dateAtFirstDiagnosed
        }
      });
      return res.json({ contents });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = index;