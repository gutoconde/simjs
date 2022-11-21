const serviceFactory = require('../model/ServiceFactory');

module.exports.importarDados = async(req, res) => {
	try {
        console.log('Iniciando importacao de dados');
        const servicoImportacao = serviceFactory.getServicoImportacaoGabinete(req.db);
        servicoImportacao.importarGabinetes();
        console.log('Importacao de gabinetes iniciada');

        const servicoImportacaoServidor = serviceFactory.getServicoImportacaoServidor(req.db);
        servicoImportacaoServidor.importarServidores(); 
        console.log('Importacao de servidores iniciada');
        
        var data = {
			'mensagem' : 'Importacao iniciada.'
		};

		res.json(data);
		res.end();
	} catch (err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao recuperar cargos: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};