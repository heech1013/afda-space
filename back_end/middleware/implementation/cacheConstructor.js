const Cache = require('./Cache');

const MAX_SIZE = 100;

const medicineSummaryCache = new Cache({ MAX_SIZE });

module.exports = medicineSummaryCache;