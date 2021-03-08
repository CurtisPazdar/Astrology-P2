const db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.handlebars");
  });

  app.get("/message", function (req, res) {
    var query = {};
    db.Post.findAll({
      where: query,
      include: [
        db.User,
        {
          model: db.Comment,
          include: [db.User],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [db.Comment, "createdAt", "ASC"],
      ],
    }).then((posts) => {
      var hbsObject = {
        hbPosts: posts,
        user: req.user,
      };

      res.render("message", hbsObject);
    });
  });
};
