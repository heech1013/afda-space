module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('station', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
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
  return Station;
};