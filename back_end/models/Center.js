module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('center', {
    centerName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    doctorName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    si: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    gu: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return Center;
};