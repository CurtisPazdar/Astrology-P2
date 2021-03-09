var db = require("../models");
const app = require("express");

module.exports = function(app) {


    app.get("/message", function(req, res) {

        console.log("/api/posts call made");
        var query = {};
        if (req.query.user_id) {
          query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            order: [
				['createdAt', 'DESC'],
				[db.Post, 'createdAt', 'ASC']	
            ],
            include: [
                db.User, 
                {
                    model: db.Post,
                    include: [ db.User],
                }
            ]
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/message/create", function(req, res) {

        const id = req.user.id
        console.log(req.body);
        console.log(typeof id);
        
        db.Post.create({
            body: req.body.body,
            UserId: id
         
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

}