const { Profile } = require('../../../models');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nick, introduction } = req.body;
    await Profile.update(
      { nick, introduction },
      {
        where: { fkUserId: id }
      }
    );
    return res.json({});
  } catch (e) {
    next(e);
  }
};

module.exports = update;