require('dotenv').config();
var tarefaImportacaoDados = require("./model/TarefaImportacaoDados");
var db = require("./integracao/Database.js")

module.exports.execute = function() {
    tarefaImportacaoDados.executar(db);
};