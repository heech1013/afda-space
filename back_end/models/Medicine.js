module.exports = (sequelize, DataTypes) => {
  const Medicine = sequelize.define('medicine', {
    nameKr: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nameEn: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return Medicine;
};