// var db = require("../models");
// const app = require("express");
// var bodyParser = require('body-parser')





// module.exports = function(app) {
//     app.get("/posts/", function(req, res) {
       
//         var query = {};
//         if (req.query.user_id) {
//           query.UserId = req.query.user_id;
//         }
//         db.Post.findAll({
//             where: query,
//             order: [
// 				['createdAt', 'DESC'],
// 				[db.Comment, 'createdAt', 'ASC']	
//             ],
//             include: [
//                 db.User, 
//                 {
//                     model: db.Comment,
//                     include: [ db.User],
//                 }
//             ]
//             }).then(function(dbPost) {
//             res.json(dbPost);
//         });
//     });
// }

//     // app.get("/message", function(req, res) {

//     //     db.Post.findAll({
//     //         order: [
// 	// 			['createdAt', 'DESC'],
// 	// 			[db.Post, 'createdAt', 'ASC']	
//     //         ],
//     //         include: [
//     //             db.User, 
//     //             {
//     //                 model: db.Post,
//     //                 include: [ db.User],
//     //             }
//     //         ]
//     //         }).then(function(dbPost) {
//     //         res.render('message',{
//     //             dbPost
//     //         });
//     //     });
//     // });

//     // app.post("/message",function(req, res) {
//     //     const id = req.user.id
       
//     //     console.log(JSON.stringify(req.body));
//     //     console.log(typeof id);
     
//     //     db.Post.create({
//     //         body: JSON.stringify(req.body.message),
//     //         UserId: id
         
//     //     }).then(function(dbPost) {
//     //         console.log(dbPost)
//     //         res.render("message.handlebars",dbPost);
//     //     });
//     // });

// }