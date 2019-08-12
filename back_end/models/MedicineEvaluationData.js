module.exports = (sequelize, DataTypes) => {
  const MedicineEvaluationData = sequelize.define('medicineEvaluationData', {
    evaluationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sideEffects: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adherence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    burden: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unexpectedPositiveEffects: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    costDateUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return MedicineEvaluationData;
};