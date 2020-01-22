module.exports = (sequelize, DataTypes) => {
  const ReasonOfStop = sequelize.define('reasonOfStop', {
    noEffect: {  // 효과가 없는 것 같아서
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    expensive: {  // 가격이 비싸서
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    personalResearch: {  // 개인적인 판단 하에
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    doctorAdvice: {  // 전문가(의사, 임상심리전문가 등)의 권유로
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sideEffect: {  // 부작용이 너무 심해서
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    courseDone: {  // 치료 과정이 모두 마무리 되어서
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    other: {  // 기타
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reasonText: {  // 기타(구체적인 이유 작성)
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return ReasonOfStop;
}