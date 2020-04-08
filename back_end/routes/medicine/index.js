const { Sequelize, Medicine, MedicineData } = require('../../models');

const index = async (req, res, next) => {
  try {
    /** aggregation with associated model
     * 발생했던 문제: MedicineData를 하나도 가지고 있지 않은 Medicine은 조회되지 않음. 최소 1개 이상 가지고 있어야 조회가 됨.
     * the primary key of the included models must be excluded with 'attributes: []'.
     * the aggregation must be done on the main model.
     * https://stackoverflow.com/questions/28206680/using-group-by-and-joins-in-sequelize
     */
    const contentList = await Medicine.findAll({
        attributes: ['id', 'nameKr', 'nameEn', [Sequelize.fn("COUNT", Sequelize.col("medicineData.id")), "count"]],
        include: [{
          model: MedicineData,
          attributes: [],
        }],
        group: ['id', 'nameKr', 'nameEn'],
        order: [[Sequelize.fn("COUNT", Sequelize.col("medicineData.id")), 'DESC']]
      });
    console.log(JSON.stringify(contentList));

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;