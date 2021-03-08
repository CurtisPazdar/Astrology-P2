


module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      body: {
          type: DataTypes.STRING
      }
    });


  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });

    Post.hasMany(models.Comment, {
      onDelete: "cascade",
    });
  };
  return Post;
};