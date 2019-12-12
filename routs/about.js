var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/about", function(req, res) {
    res.render("about");
});


module.exports = router;