const userIdArrMaker = (objArr) => {
  return new Promise((resolve, reject) => {
    let idArr = [];
    objArr.map((obj) => {
      idArr.push(obj.id);
    });
    resolve(idArr);
  });
};

module.exports = userIdArrMaker;