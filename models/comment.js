
module.exports = function(sequelize, Datatypes) {
    var Comment = sequelize.define("Comment", {
        body : {
            type: Datatypes.TEXT,
            allowNull: false,
        }
    });

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });

        Comment.belongsTo(models.Post,{
            foreignKey: {
                allowNull: true
            }
        });
   }

    return Comment;
}