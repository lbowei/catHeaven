var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seed"),
  methodOverride = require("method-override"),
  User = require("./models/user");

//requring reuts
var indexRoutes = require("./routs/index"),
  campgroundRoutes = require("./routs/campgrounds"),
  commentRoutes = require("./routs/comments");
  mapRoutes = require("./routs/map")

var databaseURL = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
// mongoose.connect(databaseURL);
// //mongoose.connect("mongodb://localhost/yelp_camp");
// //mongoose.connect("mongodb://nkyelpcamp:nk903933@ds259070.mlab.com:59070/nkyelpcamp");
// //console.log(databaseURL);
mongoose
  .connect(
    "mongodb+srv://lbowei:weilongbo.98@cluster0-ksry8.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log("ERROR", err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
app.use(
  require("express-session")({
    secret: "One day I will quanqur the world!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
//use routs
app.get("/profile", function(req, res) {
  res.send("Working on profile section");
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(mapRoutes);

app.locals.moment = require("moment");

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});
