const ServiceFatory = require('../model/ServiceFactory');

module.exports.listarCargos = async(req, res) => {
	try {
		const cargos = await ServiceFatory.getRepositorioCargo(req.db).listarCargos();
		res.json(cargos);
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