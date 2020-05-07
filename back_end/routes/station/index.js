const { Sequelize, Station, StationComment } = require('../../models');
const format = require('date-fns/format');

const index = async (req, res, next) => {
  try {
    const stationListBefore = await Station.findAll({
      /** 왜 diagnosisData는 diagnosisData고 stationComment는 stationComments죠? */
      attributes: ['id', 'title', 'createdAt', [Sequelize.fn('COUNT', Sequelize.col('stationComments.id')), 'count']],
      include: [{
        model: StationComment,
        attributes: []
      }],
      group: ['id', 'title'],
      order: [['createdAt', 'DESC']]
    });
    
    let stationList = [];

    await (  // Promise 리턴 함수 + 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for(let obj of stationListBefore) {
          const skippedTitle = obj["title"].length > 50 ? obj["title"].substring(0, 53) + " ..." : obj["title"]
          stationList.push({
            "id": obj["id"],
            "title": skippedTitle,
            "createdAt": format(obj["createdAt"], "yyyy-MM-dd"),  //  HH:mm
            "count": obj.dataValues["count"]
          });
        }
        resolve();
      })
    )();

    return res.status(200).json({ stationList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;