const { Center } = require('../../models');

const index = async (req, res, next) => {
  try {
    const forumList = await Center.findAll({
      attributes: ['id', 'centerName', 'doctorName', 'si', 'gu']
    });
    return res.status(200).json({ forumList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;