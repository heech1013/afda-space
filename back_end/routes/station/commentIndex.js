const { StationComment, User, Profile } = require('../../models');

const commentIndex = async (req, res, next) => {
  try {
    const { id } = req.params;
    const forumCommentList = await StationComment.findAll({
      attributes: ['body', 'updatedAt'], where: { fkStationId: id },
      include: [{ 
        model: User, as: 'RegisteringStationComment', attributes: ['id'],
        include: [{ model: Profile, as: 'Profile', attributes: ['nick']}]
      }]
    });

    return res.status(200).json({ forumCommentList });
  } catch (e) {
    next(e);
  }
};

module.exports = commentIndex;