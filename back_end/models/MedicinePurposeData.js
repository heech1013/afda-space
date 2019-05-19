module.exports = (sequelize, DataTypes) => {
  const MedicinePurposeData = sequelize.define('medicinePurposeData', {
    perceivedEffectiveness: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return MedicinePurposeData;
};