const nullStringHandler = (data) => {
  for (let [key, value] of Object.entries(data)) {
    if (value === '') {
      data[key] = null
    }
  }
}

module.exports = nullStringHandler