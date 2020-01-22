const nullStringHandler = (data) => {
  return new Promise((resolve, reject) => {
    for (let key in data) {
      if (data[key] === '') data[key] = null;
    }
    resolve();
  })
}

module.exports = nullStringHandler;