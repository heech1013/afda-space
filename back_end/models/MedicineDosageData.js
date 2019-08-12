module.exports = (sequelize, DataTypes) => {
  const MedicineDosageData = sequelize.define('medicineDosageData', {
    takingStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    recentTakingYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recentTakingMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recentTakingDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dosageCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dosageMg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dosageFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    additionalDosage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    switchTo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstTakingYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstTakingMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstTakingDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    initialDosageCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    initialDosageMg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    initialDosageFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopTakingYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopTakingMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopTakingDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reasonOfStop: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    otherReasonOfStop: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return MedicineDosageData;
};