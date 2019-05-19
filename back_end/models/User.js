module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userType: {
      // 'patient' / 'expert' / 'manager'
      type: DataTypes.STRING(10),
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return User;
};