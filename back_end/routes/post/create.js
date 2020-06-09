const { Post } = require('../../models');

const create = async (req, res, next) => {
  try {
    const { state } = req.body;
    const { userId, body } = state;

    // await Station.create({ title, body, fkUserId: userId });
    await Post.create({ body, fkUserId: userId });

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = create;