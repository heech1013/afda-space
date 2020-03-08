const { StationComment, User, Profile } = require('../../models');

const commentIndex = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stationCommentList = await StationComment.findAll({
      attributes: ['body', 'createdAt'], where: { fkStationId: id },
      include: [{ 
        model: User, attributes: ['id'],
        include: [{ model: Profile, attributes: ['nick']}]
      }]
    });

    return res.status(200).json({ stationCommentList });
  } catch (e) {
    next(e);
  }
};

module.exports = commentIndex;