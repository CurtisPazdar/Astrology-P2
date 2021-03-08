const app = require("express");
var db = require("../models");

$(document).ready(function () {
  var postBodyInput = $("#post-body");

  $("#post-submit").on("click", function () {
    console.log("button was clicked");

    if (!postBodyInput.val().trim()) {
      return;
    }

    console.log();
    var newPost = {
      body: postBodyInput.val().trim(),
      userId: req.user.id,
    };

    console.log(newPost);

    submitPost(newPost);
  });

  function submitPost(Post) {
    app.post("/api/posts/", Post, function () {
      location.reload();
    });
  }
});
