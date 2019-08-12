module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define('postComment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return PostComment;
};