module.exports = (sequelize, DataTypes) => {
  const CenterComment = sequelize.define('centerComment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return CenterComment;
};