module.exports = (sequelize, DataTypes) => {
  const MedicineSideEffectsData = sequelize.define('medicineSideEffectsData', {
    startNoticingWhenStartTaking: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    startNoticingYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startNoticingMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startNoticingDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return MedicineSideEffectsData;
};