const { Post, PostComment, User, Profile } = require('../../models');

const index = async (req, res, next) => {
  const { userId: id } = req.query;
  const userIdWhereClause = (id && id !== 'undefined') ? { where: { id } } : null;
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'body', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'Posts',
          attributes: ['id'],
          ...userIdWhereClause,
          include: [
            {
              model: Profile,
              as: 'Profile',
              attributes: ['nick']
            }
          ]
        },
        {
          model: PostComment,
          as: 'RegisteredPostComments',
          attributes: ['id', 'body'],
          include: [
            {
              model: User,
              as: 'RegisteringPostComments',
              attributes: ['id'],
              include: [
                {
                  model: Profile,
                  as: 'Profile',
                  attributes: ['nick']
                }
              ]
            }
          ]
        }
      ]
    });

    return res.status(200).json({ posts });
  } catch (e) {
    next(e);
  }
}

module.exports = index;