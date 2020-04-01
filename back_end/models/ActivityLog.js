module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('activityLog', {
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return ActivityLog;
}