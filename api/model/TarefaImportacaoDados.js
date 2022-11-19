const serviceFactory = require('../model/ServiceFactory');

class TarefaImportacaoDados {

    async executar(db) {
        const servicoImportacao = serviceFactory.getServicoImportacaoGabinete(db);
        servicoImportacao.importarGabinetes();

        const servicoImportacaoServidor = serviceFactory.getServicoImportacaoServidor(db);
        servicoImportacaoServidor.importarServidores(); 
    }
}

module.exports = TarefaImportacaoDados;