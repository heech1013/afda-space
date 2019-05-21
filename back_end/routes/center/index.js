const { Center } = require('../../models');

const index = async (req, res, next) => {
  try {
    const centerList = await Center.findAll({
      attributes: ['id', 'centerName', 'doctorName', 'si', 'gu']
    });
    return res.status(200).json({ centerList });
  } catch (e) {
    next(e);
  }
};

module.exports = index;