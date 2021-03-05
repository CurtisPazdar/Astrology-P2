module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    body: {
      type: DataTypes.STRING,
    },
  });
  return Post;
};
