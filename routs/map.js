var express   =require("express");
var router    =express.Router();
var User      =require("../models/user");
var passport  =require("passport");

router.get("/map",function(req,res){
    res.render("map");
});


 module.exports=router;