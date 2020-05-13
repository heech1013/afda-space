const { Post, PostComment, User, Profile } = require('../../models');

const index = async (req, res, next) => {
  const { userId } = req.query;  // undefined if for default newspeed, otherwise userId integer
  const whereObj = userId  ?  { fkUserId: userId } : {};

  try {
    const newspeed = await Post.findAll({
      attributes: ['body', 'createdAt'],
      include: [
        // {
        //   model: User, attributes: ['id'],
        //   include: [{ model: Profile, attributes: ['nick'] }]
        // },
        {
          model: PostComment, attributes: ['body'],
          include: [{
              model: User, attributes: ['id'],
              include: [{ model: Profile, attributes: ['nick'] }]
          }]
        }
      ],
      where: whereObj,
      order: [['createdAt', 'DESC']],
      limit: 15
    })
        
    return res.status(200).json({ newspeed });
  } catch (e) {
    next(e);
  }
}

module.exports = index;