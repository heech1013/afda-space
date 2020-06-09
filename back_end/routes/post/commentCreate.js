const { PostComment } = require('../../models');

const commentCreate = async (req, res, next) => {
  try {
    const { id } = req.params;  // postId
    const { state } = req.body;
    const { body, userId } = state;
    
    await PostComment.create({ body, fkPostId: id, fkUserId: userId });

    return res.status(201).json({ success: true });
  } catch(e) {
    next(e);
  }
}

module.exports = commentCreate;