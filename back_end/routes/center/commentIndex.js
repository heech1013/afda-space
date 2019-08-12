const { CenterComment, User, Profile } = require('../../models');

const commentIndex = async (req, res, next) => {
  try {
    const { id } = req.params;
    const forumCommentList = await CenterComment.findAll({
      attributes: ['body', 'updatedAt'], where: { fkCenterId: id },
      include: [{ 
        model: User, as: 'RegisteringCenterComment', attributes: ['id'],
        include: [{ model: Profile, as: 'Profile', attributes: ['nick']}]
      }]
    });

    return res.status(200).json({ forumCommentList });
  } catch (e) {
    next(e);
  }
};

module.exports = commentIndex;