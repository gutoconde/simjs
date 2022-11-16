const ServiceFatory = require('../model/ServiceFactory');

module.exports.listarGabinetes = async(req, res) => {
	try {
		const gabinetes = await ServiceFatory.getRepositorioGabinete(req.db).listarGabinetes();
		res.json(gabinetes);
		res.end();
	} catch (err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao recuperar gabinetes: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};

module.exports.listarServidores = async(req, res) => {
	try {
        var idGabinete = req.params.codigo;
		const servidores = await ServiceFatory.getRepositorioServidor(req.db).findByIdGabinete(idGabinete);
		res.json(servidores);
		res.end();
	} catch (err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao recuperar servidores: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};