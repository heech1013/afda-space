/**  data(state) 안에 val = { yes: false, no: false } 꼴의 값을 의미에 맞게 boolean으로 변환 */
const radioHandler = (val) => {    
  if (val.yes) {
    val = true;
    return val;
  }
  else if (val.no || (!val.yes && !val.no)) {
    val = false;
    return val;
  }
}

module.exports = radioHandler;