const { Sequelize, DiagnosisData, Symptom, SymptomData } = require('../../models');

const symptomIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const diagnosedUserList = await DiagnosisData.findAll({
      attributes: ['fkUserId'],
      where: { 'fkDiagnosisId': id }
    });

    const userIdArrMaker = (objArr) => {
      return new Promise((resolve, reject) => {
        let idArr = [];
        objArr.map((obj) => {
          idArr.push(obj.fkUserId);
        });
        resolve(idArr);
      });
    };

    const userIdArr = await userIdArrMaker(diagnosedUserList);  

    const contentSymptomList = await Symptom.findAll({
      attributes: ['id', 'nameKr', [Sequelize.fn("COUNT", Sequelize.col("RegisteredSymptomData.id")), "count"]],
      include: [{
        model: SymptomData,
        as: "RegisteredSymptomData",
        attributes: [],
        where: { 'fkUserId': { [Sequelize.Op.in]: userIdArr }},
        required: false
      }],
      group: ['id', 'nameKr'],
      order: [[Sequelize.fn("COUNT", Sequelize.col("RegisteredSymptomData.id")), "DESC"]]
    });
    
    return res.status(200).json({ contentSymptomList });
  } catch (e) {
    next(e);
  }
};

module.exports = symptomIndex;