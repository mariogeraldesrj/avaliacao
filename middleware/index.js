var Curriculo = require("../models/curriculo");
var User = require("../models/user");

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Você precisa entrar com o seu usuario para fazer isso!");
        res.redirect("/login");
    },
    checkUserCurriculo: function(req, res, next){
        if(req.isAuthenticated()){
            Curriculo.findById(req.params.id, function(err, curriculo){
               if(curriculo.autor.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "Você não tem permissão pra isso!");
                   res.redirect("/curriculos/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "Você precisa entrar com o seu usuario pra fazer isso!");
            res.redirect("/login");
        }
    },
    checkUserUsuario: function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, usuario){
            if (usuario._id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Você não pode excluir outras contas!");
                res.redirect("/usuarios/");
            }
        });
    } else {
            req.flash("error", "Você precisa entrar com o seu usuario pra fazer isso!");
            res.redirect("/login");
    }    
    },
}
