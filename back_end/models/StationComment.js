module.exports = (sequelize, DataTypes) => {
  const StationComment = sequelize.define('stationComment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return StationComment;
};