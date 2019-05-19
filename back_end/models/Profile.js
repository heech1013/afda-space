module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    nick: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sex: {
      // 1(남성) / 2(여성)
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return Profile;
};