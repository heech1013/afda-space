/** 진단명 리스트 불러오기(GET '/api/diagnosis')와 다르게,
    메인메뉴(진단명, 처방약 등)의 content list에 쓰이지 않아서
    symptomData에서 가져오지도 않고, 개수를 세지도 않는다.
 *  */
const { Symptom } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Symptom.findAll({
      attributes: ['id', 'nameKr']
    });

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;