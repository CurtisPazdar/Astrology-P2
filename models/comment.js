module.exports = function(sequelize, Datatypes) {
    var Comment = sequelize.define("Comment", {
        body : {
            type: Datatypes.TEXT,
            allowNull: false,
        }
    });

    Comment.associate = function(model) {
        Comment.belongsTo(model.User, {
            foreignKey: {
                allowNull: true
            }
        });

    Comment.belongsTo(model.Post,{
        foreignKey: {
            allowNull: true
        }
    });
   }

    return Comment;
}