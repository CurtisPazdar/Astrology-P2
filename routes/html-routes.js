
const db = require("../models");


module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.handlebars");
  });

  // app.get("/message", function (req, res) {
    
  //   db.Post.findAll({
  //     include: [
  //       db.User,
  //       {
  //         model: db.Comment,
  //         include: [db.User],
  //       },
  //     ],
  //     order: [
  //       ["createdAt", "DESC"]
  //     ],
  //   }).then((posts) => {
  //     res.render("message", {posts});
  //   });
  // });
const getPosts = () => {
  app.get("/message/", function(req, res) {
		console.log("Before the get attempt");
		var query = {};
		db.Post.findAll({
			where: query,
			include: [
                db.User, 
                {
                    model: db.Comment,
					include: [ db.User],
                }
			],
			order: [
				['createdAt', 'DESC'],
				[db.Comment, 'createdAt', 'ASC']	
            ]
			}).then(posts => {
			var hbsObject = {
				hbPosts: posts,
				user: req.user
			}

			res.render("message", hbsObject);		
		});
	});
}

 getPosts();
  
  app.post("/message/",function(req, res) {
    const id = req.user.id
   
    console.log(JSON.stringify(req.body));
    console.log(typeof id);
 
    db.Post.create({
        body: JSON.stringify(req.body.message),
        UserId: id
     
    }).then(function(dbPost) {
        console.log(dbPost)
        res.redirect("/message");
    });
});

};
