module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    authId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING(10),  // 'patient' / 'expert' / 'manager'
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'local'
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return User;
};