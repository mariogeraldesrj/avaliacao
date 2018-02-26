var express = require("express");
var router  = new express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", function(req, res){
   User.find({}, function(err, users){
       if(err){
           console.log("ERRO!");
       } else {
          res.render("indexu", {users: users}); 
       }
   });
});

// ROTA DE FORMULARIO DE CRIAÇÃO DE USUARIOS
router.get("/novo", function(req, res){
    res.render("novou");
});

router.delete("/:id",middleware.checkUserUsuario, function(req, res){
   User.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/usuarios");
       } else {
           res.redirect("/usuarios");
       }
   })
});

module.exports = router;