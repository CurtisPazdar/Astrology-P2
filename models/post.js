module.exports = function(sequelize, Datatypes) {
  var Post = sequelize.define("Post", {
    body: {
        type: DataTypes.STRING
    }
  })
}