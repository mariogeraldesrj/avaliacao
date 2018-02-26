var mongoose = require("mongoose");

var curriculoSchema = new mongoose.Schema({
    nome: String,
    nacionalidade: String,
    estadocivil: String,
    idade: String,
    endereco: String,
    bairro: String,
    cidade: String,
    estado: String,
    telefone: String,
    celular: String,
    email: String,
    objetivo: String,
    formacao: String,
    universidade: String,
    formacaofim: String,
    idioma: String,
    experiencia: String,
    created: {type: Date, default: Date.now},
   autor: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
});

module.exports = mongoose.model("Curriculo", curriculoSchema);

