const { DiagnosisData } = require('../../../models');

const create = async (req, res, next) => {
  try {
    const {} = req.body;
    await DiagnosisData.create({
      fkDiagnosisId, fkUserId,
      firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstNoticeUnaware, firstNoticeUnknown,
      firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, firstDiagnosedUnaware, firstDiagnosedUnknown
    })
  } catch (e) {
    next (e)
  }
};

module.exports = create;