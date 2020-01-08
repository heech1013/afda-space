const { DiagnosisData } = require('../../../models');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  /** 추가하려는 진단명을 제외하고는 모두 선택적으로 제출할 수 있음(필수가 아님).
   * 진단명 또한 초깃값(diagnosisId)가 1로 설정되어 있어 무조건 특정 값이 제출되는 형태.
   */
  try {
    const { id: fkUserId } = req.params;
    /** 사용자의 입력 값이 ProfileDiagnosisAddModal의 state를 통해 data라는 이름으로 api에 전달. */
    let { data } = req.body;
    
    /** data(state)의 날짜 입력값 중 빈 칸은 모두 null string('')으로 제출된다.
     * DiagnosisData model의 날짜 type은 INTEGER로, ''를 insert할 수 없다. 따라서 모두 null로 바꿔준다.
     * profileDiagnosisAddModal의 initial state의 날짜 항목 default를 null로 설정할 수는 없다. input tag의 value 값을 null로 설정할 수 없기 때문이다.
     */
    const nullStringHandler = (data) => {
      return new Promise((resolve, reject) => {
        for (let key in data) {
          if (data[key] === '') data[key] = null;
        }
        resolve();
      })
    }
    await nullStringHandler(data);

    const {
      diagnosisId: fkDiagnosisId,
      firstNoticeYear, firstNoticeMonth, firstNoticeDay, FNRadioGroup,
      firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, FDRadioGroup
    } = data;

    /** FN, FD 상관 없이 둘 중 하나(Unaware / Unknown)의 값이 true일 경우 나머지 항목은 key 자체가 사라짐.
     * 이를 위해 default 값을 false로 설정. 만약 둘 중 하나가 true일 경우 나머지는 default에 따라 false가 됨.
     */
    const { firstNoticeUnaware = false, firstNoticeUnknown = false } = FNRadioGroup;
    const { firstDiagnosedUnaware = false, firstDiagnosedUnknown = false } = FDRadioGroup;

    /** 날짜의 유효성 체크 없이 받는다. */

    const existingDiagnosisData = await DiagnosisData.findAll({ where: { fkUserId, fkDiagnosisId }});
    if (existingDiagnosisData.length) next(CustomError("BadRequest", "이미 등록한 진단명입니다."));
    
    else {
      await DiagnosisData.create({
        fkUserId, fkDiagnosisId,
        firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstNoticeUnaware, firstNoticeUnknown,
        firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay, firstDiagnosedUnaware, firstDiagnosedUnknown
      });
      return res.json({ success: true });
    }
  } catch (e) {
    next (e)
  }
};

module.exports = create;