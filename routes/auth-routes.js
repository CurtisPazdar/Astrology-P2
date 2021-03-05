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
      let birthdate = parseInt(req.body.monthofbirth + req.body.dayofbirth);
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        birthSign: renderSign(birthdate),
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

const renderSign = (birthdate) => {
  console.log(birthdate);
  if (321 <= birthdate && birthdate <= 419) {
    return "Aries";
  } else if (420 <= birthdate && birthdate <= 520) {
    return "Taurus";
  } else if (521 <= birthdate && birthdate <= 620) {
    return "Gemini";
  } else if (621 <= birthdate && birthdate <= 722) {
    return "Cancer";
  } else if (723 <= birthdate && birthdate <= 822) {
    return "Leo";
  } else if (823 <= birthdate && birthdate <= 922) {
    return "Virgo";
  } else if (923 <= birthdate && birthdate <= 1022) {
    return "Libra";
  } else if (1023 <= birthdate && birthdate <= 1121) {
    return "Scorpio";
  } else if (1122 <= birthdate && birthdate <= 1221) {
    return "Sagittarius";
  } else if (120 <= birthdate && birthdate <= 218) {
    return "Aquarius";
  } else if (219 <= birthdate && birthdate <= 320) {
    return "Pisces";
  } else {
    return "Capricorn";
  }
};
