const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../models");
const passport = require("passport");

function initialize(passport, user, findById) {
  let User = user;
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user was found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email

        usernameField: "email",

        passwordField: "password",

        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var User = user;

        var isValidPassword = function (userpass, password) {
          return bcrypt.compareSync(password, userpass);
        };
        console.log("logged to", email);
        db.User.findOne({
          where: {
            email: email,
          },
        })
          .then(function (user) {
            console.log(user);
            if (!user) {
              return done(null, false, {
                message: "Email does not exist",
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password.",
              });
            }

            var User = user.get();

            return done(null, User);
          })
          .catch(function (err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
      }
    )
  );
  console.log(User);
  //serialize
  passport.serializeUser(function (User, done) {
    done(null, { id: User.id, email: User.email });
  });

  passport.deserializeUser(function (User, done) {
    done(null, { id: User.id, email: User.email });
  });
}

module.exports = initialize;
