const path = require("path");
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require("../config/passport-config");
initializePassport(passport);

module.exports = (app) => {
  app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.handlebars");
  });

  app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("signup-login.handlebars");
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.handlebars");
  });

  app.post("/register", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.redirect("/login");
    } catch {
      res.redirect("/register");
    }
  });

  app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    }
    next();
  }
};
