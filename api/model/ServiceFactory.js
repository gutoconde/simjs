const RepositorioCargo = require('../model/RepositorioCargo');
const RepositorioGabinete = require('../model/RepositorioGabinete');
const RepositorioServidor = require('../model/RepositorioServidor');

class ServiceFactory {

    static getRepositorioCargo(db) {
        return new RepositorioCargo(db);
    }

    static getRepositorioGabinete(db) {
        return new RepositorioGabinete(db);
    }

    static getRepositorioServidor(db) {
        return new RepositorioServidor(db);
    }
};
module.exports = ServiceFactory;

