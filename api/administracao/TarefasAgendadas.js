
const cron = require('node-cron');
const TarefaImportacaoDados = require('../model/TarefaImportacaoDados');

module.exports = (db) => {
	cron.schedule('00 10 05 * * *', () => {
		const task = new TarefaImportacaoDados();
		task.executar(db);
	});
};
