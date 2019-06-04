const { Center, User, Profile } = require('../../models');

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const forum = await Center.findOne({
      attributes: ['si', 'gu', 'centerName', 'doctorName'], where: { id },
      include: [
        {
          model: User, as: 'RegisteringCenter', attributes: ['id'],
          include: [{ model: Profile, as: 'Profile', attributes: ['nick'] }]
        }
      ]
    });

    return res.status(200).json({ forum });
  } catch (e) {
    next(e);
  }
};

module.exports = show;