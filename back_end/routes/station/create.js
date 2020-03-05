const { Station } = require('../../models');

const create = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { title, body, userId } = data;

    await Station.create({ title, body, fkUserId: userId });

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = create;