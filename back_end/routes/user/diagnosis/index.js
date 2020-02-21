const { Diagnosis, DiagnosisData } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedContents = await DiagnosisData.findAll({
      attributes: ['id', 'firstNoticeYear', 'firstNoticeMonth', 'firstNoticeDay', 'firstNoticeUnaware', 'firstNoticeUnknown', 'firstDiagnosedYear', 'firstDiagnosedMonth', 'firstDiagnosedDay', 'firstDiagnosedUnaware', 'firstDiagnosedUnknown'],
      where: { fkUserId: id },
      include: [{ model: Diagnosis, attributes: ['nameKr'] }]
    });

    if (!uncleanedContents) return res.json({ contents: [] });  // []
    else {
      const contents = uncleanedContents.map((content) => {
        const { id, firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstNoticeUnknown, firstNoticeUnaware, firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, firstDiagnosedUnknown, firstDiagnosedUnaware } = content;
        const dateAtFirstSymptom =
          firstNoticeUnaware ? '증상을 전혀 알아채지 못했음' :
            firstNoticeUnknown ? '알 수 없음' :
              firstNoticeDay ? `${firstNoticeYear}년 ${firstNoticeMonth}월 ${firstNoticeDay}일` :
                firstNoticeMonth ? `${firstNoticeYear}년 ${firstNoticeMonth}월}` :
                  firstNoticeYear ? `${firstNoticeYear}년` : '-';
        const dateAtFirstDiagnosed =
          firstDiagnosedUnaware ? '진단을 받은 적은 없지만 가지고 있다고 생각한다' :
            firstDiagnosedUnknown ? '알 수 없음' :
              firstDiagnosedDay ? `${firstDiagnosedYear}년 ${firstDiagnosedMonth}월 ${firstDiagnosedDay}일` :
                firstDiagnosedMonth ? `${firstDiagnosedYear}년 ${firstDiagnosedMonth}월}` :
                  firstDiagnosedYear ? `${firstDiagnosedYear}년` : '-';
        return {
          id,
          diagnosisName: content.diagnosis.nameKr,
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