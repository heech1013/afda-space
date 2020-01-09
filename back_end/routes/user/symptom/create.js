const { SymptomData } = require('../../../models');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const create = async (req, res, next) => {
  try {
    const { id: fkUserId } = req.params;
    const { symptomId: fkSymptomId } = req.body;

    const existingSymptomData = await SymptomData.findAll({ where: { fkUserId, fkSymptomId }});
    if (existingSymptomData.length) next(CustomError("BadRequest", "이미 등록한 증상입니다."));
    
    else {
      await SymptomData.create({ fkUserId, fkSymptomId });
      return res.json({ success: true});
    }
  } catch (e) {
    next(e);
  }
}

module.exports = create;