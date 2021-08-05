const { DiagnosisData, ActivityLog } = require('../../../models');
const nullStringHandler = require('../../../middleware/maker/nullStringHandler');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  /** 추가하려는 진단명을 제외하고는 모두 선택적으로 제출할 수 있음(필수가 아님).
   * 진단명 또한 초깃값(diagnosisId)가 1로 설정되어 있어 무조건 특정 값이 제출되는 형태.
   */
  try {
    const { id: fkUserId } = req.params;
    let { data } = req.body;
    
    nullStringHandler(data);

    const {
      diagnosisId: fkDiagnosisId,
      firstNoticeYear, firstNoticeMonth, firstNoticeDay, FNRadioGroup,
      firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, FDRadioGroup
    } = data;

    const { firstNoticeUnaware = false, firstNoticeUnknown = false } = FNRadioGroup;
    const { firstDiagnosedUnaware = false, firstDiagnosedUnknown = false } = FDRadioGroup;

    const existingDiagnosisData = await DiagnosisData.findAll({ where: { fkUserId, fkDiagnosisId }});
    if (existingDiagnosisData.length) next(CustomError("BadRequest", "이미 등록한 진단명입니다."));
    
    else {
      await DiagnosisData.create({
        fkUserId, fkDiagnosisId,
        firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstNoticeUnaware, firstNoticeUnknown,
        firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, firstDiagnosedUnaware, firstDiagnosedUnknown
      });

      await ActivityLog.create({ type: 'REGISTER_DIAGNOSIS', fkDiagnosisId, fkUserId });
      
      return res.json({ success: true });
    }
  } catch (e) {
    next (e)
  }
};

module.exports = create;