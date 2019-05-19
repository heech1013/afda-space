module.exports = (sequelize, DataTypes) => {
  const DiagnosisData = sequelize.define('diagnosisData', {
    firstNoticeYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstNoticeMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstNoticeDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstNoticeUnaware: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    firstNoticeUnknown: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    firstDiagnosedYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstDiagnosedMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstDiagnosedDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstDiagnosedUnaware: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    firstDiagnosedUnknown: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return DiagnosisData;
};