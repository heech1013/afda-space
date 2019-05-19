module.exports = (sequelize, DataTypes) => {
  const SymptomData = sequelize.define('symptomData', {
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return SymptomData;
};