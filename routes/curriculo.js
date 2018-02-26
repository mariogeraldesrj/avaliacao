var express = require("express");
var router  = express.Router();
var Curriculo = require("../models/curriculo");
var middleware = require("../middleware");

router.get("/",function(req, res){
   Curriculo.find({}, function(err, curriculos){
       if(err){
           console.log("ERRO!");
       } else {
          res.render("index", {curriculos: curriculos}); 
       }
   });
});


// ROTA DE CREATE CURRICULOS

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var nome = req.body.nome;
    var nacionalidade = req.body.nacionalidade;
    var estadocivil = req.body.estadocivil;
    var idade = req.body.idade;
    var endereco = req.body.endereco;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var telefone = req.body.telefone;
    var celular = req.body.celular;
    var email = req.body.email;
    var objetivo = req.body.objetivo;
    var formacao = req.body.formacao;
    var universidade = req.body.universidade;
    var formacaofim = req.body.formacaofim;
    var idioma = req.body.idioma;
    var experiencia = req.body.experiencia;
    var autor = {
        id: req.user._id,
        username: req.user.username
    }
    var novoCurriculo = {nome: nome, nacionalidade: nacionalidade, estadocivil: estadocivil, idade: idade, endereco: endereco, bairro: bairro, cidade: cidade, estado: estado, telefone: telefone, celular: celular, email: email, objetivo: objetivo, formacao: formacao, universidade: universidade, formacaofim: formacaofim, idioma: idioma, experiencia: experiencia, autor:autor}
    Curriculo.create(novoCurriculo, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/curriculos");
        }
    });
});


// ROTA DE FORMULARIO DE CRIAÇÃO DE CVS
router.get("/novo",middleware.isLoggedIn, function(req, res){
        res.render("novocv", {username: req.user.username})
});

// ROTA DE AMOSTRAGEM
router.get("/:id", function(req, res){
   Curriculo.findById(req.params.id, function(err, foundCv){
       if(err){
           res.redirect("/curriculos");
       } else {
           res.render("curriculo", {curriculos: foundCv});
       }
   })
});


// ROTA DE EDIÇÃO
router.get("/:id/edit",middleware.checkUserCurriculo, function(req, res){
    Curriculo.findById(req.params.id, function(err, foundCv){
        if(err){
            res.redirect("/curriculos");
        } else {
            res.render("editcv", {curriculos: foundCv});
        }
    });
})



// ROTA DE UPDATE
router.put("/:id",middleware.checkUserCurriculo, function(req, res){
    req.body.curriculos.body = req.sanitize(req.body.curriculos.body)
   Curriculo.findByIdAndUpdate(req.params.id, req.body.curriculos, function(err, updatedCv){
      if(err){
          res.redirect("/curriculos");
      }  else {
          res.redirect("/curriculos/" + req.params.id);
      }
   });
});

// ROTAS DE REMOÇÃO DE DADOS
router.delete("/:id",middleware.checkUserCurriculo, function(req, res){
   //destroy curriculo
   Curriculo.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/curriculos");
       } else {
           res.redirect("/curriculos");
       }
   })
   //redirect somewhere
});

module.exports = router;