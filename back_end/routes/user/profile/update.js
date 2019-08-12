const { Profile } = require('../../../models');
const CustomError = require('../../../middleware/errorHandler/CustomError');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nick, introduction } = req.body;

    const existingNick = await Profile.findAll({ where: { nick }});
    if (existingNick.length) next(CustomError("BadRequest", "Nick already exists"));
    
    await Profile.update({ nick, introduction }, { where: { fkUserId: id }});
    
    return res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = update;