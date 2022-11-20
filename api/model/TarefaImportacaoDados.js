const serviceFactory = require('../model/ServiceFactory');

class TarefaImportacaoDados {

    async executar(db) {
        console.log('Iniciando importacao de dados');
        const servicoImportacao = serviceFactory.getServicoImportacaoGabinete(db);
        servicoImportacao.importarGabinetes();

        const servicoImportacaoServidor = serviceFactory.getServicoImportacaoServidor(db);
        servicoImportacaoServidor.importarServidores(); 
        console.log('Fim da importacao de dados');
    }
}

module.exports = TarefaImportacaoDados;