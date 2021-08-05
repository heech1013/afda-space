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