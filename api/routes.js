'use strict';

const cargoController = require('./controller/CargoController');
const gabineteController = require('./controller/GabineteController');

module.exports = function(app) {
    app.route('/rest/cargo').get(cargoController.listarCargos);
    app.route('/rest/gabinete').get(gabineteController.listarGabinetes);
    app.route('/rest/gabinete/:codigo/servidores').get(gabineteController.listarServidores);
};