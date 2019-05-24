const { Station } = require('../../models');

const index = async (req, res, next) => {
  try {
    const forumList = await Station.findAll({
      attributes: ['id', 'title']
    });
    return res.status(200).json({ forumList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;