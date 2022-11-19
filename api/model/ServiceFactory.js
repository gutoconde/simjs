const RepositorioCargo = require('../model/RepositorioCargo');
const RepositorioGabinete = require('../model/RepositorioGabinete');
const RepositorioServidor = require('../model/RepositorioServidor');

const ServicoImportacaoGabinete = require('../integracao/ServicoImportacaoGabinete');
const ServicoImportacaoServidor = require('../integracao/ServicoImportacaoServidor');

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

    static getServicoImportacaoGabinete(db) {
        return new ServicoImportacaoGabinete(ServiceFactory.getRepositorioGabinete(db));
    }

    static getServicoImportacaoServidor(db) {
        return new ServicoImportacaoServidor(ServiceFactory.getRepositorioServidor(db));
    }
};
module.exports = ServiceFactory;

