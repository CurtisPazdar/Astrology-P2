// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const session = require("express-session");
const PORT = process.env.PORT || 8080;
const app = express();
const passport = require("passport");
const passportRouter = require("./routes/auth-routes.js");
const messageBoardRouter = require("./routes/html-routes");
const methodOverride = require("method-override");
const db = require("./models");
const flash = require("express-flash");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(passport.initialize());
app.use(methodOverride("_method"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUnitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controller/horoscopeController.js");

passportRouter(app);
messageBoardRouter(app);
// app.use(routes);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
