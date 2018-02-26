var express = require("express");
var router  = new express.Router();
var passport = require("passport");
var middleware = require("../middleware");
var User = require("../models/user");

router.get("/", function(req, res){
   res.redirect("/curriculos"); 
});

// Rotas de Autenticação

router.get("/registro", function(req, res){
   res.render("novou"); 
});

router.post("/registro", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", "Já existe um usuario com esse nome. Escolha outro");
            return res.render("novou");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Seja bem vindo" + req.body.username);
           res.redirect("/usuarios"); 
        });
    });
});


//ROTAS DE LOGIN
//FORMULARIO DE LOGIN
router.get("/login", function(req, res){
   res.render("login"); 
});
//Logica do Login
//Middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/curriculos",
    failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;