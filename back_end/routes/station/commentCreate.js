const { StationComment } = require('../../models');

const commentCreate = async (req, res, next) => {
  try {
    const { state } = req.body;
    const { userId, stationId, body } = state;

    await StationComment.create({ body, fkUserId: userId, fkStationId: stationId });

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = commentCreate;