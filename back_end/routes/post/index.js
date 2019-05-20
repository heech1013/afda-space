const { Post, PostComment, User, Profile } = require('../../models');

const index = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: ['body', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'Posts',
          attributes: ['id'],
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
          attributes: ['body', 'updatedAt'],
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

    return res.status(200).json({ success: true, posts });
  } catch (e) {
    next(e);
  }
}

module.exports = index;