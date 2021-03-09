const app = require("express");
var db = require("../models");

var mysql = require('mysql');




$(document).ready(function(){



    var postBodyInput = $("#post-body");


 
    

    $("#post-submit").on("click", function(e) {
        
        e.preventDefault();

        console.log(postBodyInput);
        

        console.log("button was clicked")

        if (!postBodyInput.val().trim()) {
            return;
        }

        var newPost = {
            body: postBodyInput.val().trim(),
            userId: userId
        }

        console.log(newPost);

        submitPost(newPost);

    });

    function submitPost(Post) {
        app.post("/message",Post, function() {
            location.reload();
        });

    }
})

