require('dotenv').config();
var TarefaImportacaoDados = require("./model/TarefaImportacaoDados");
var db = require("./integracao/Database.js")

module.exports.execute = function() {
    var tarefaImportacaoDados = new TarefaImportacaoDados();
    tarefaImportacaoDados.executar(db);
};