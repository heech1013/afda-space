module.exports = (sequelize, DataTypes) => {
  const MedicineData = sequelize.define('medicineData', {}, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return MedicineData;
}