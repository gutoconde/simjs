'use strict';

const axios = require('axios');

class ServicoImportacaoGabinete {

    constructor(repositorioGabinete) {
        this.repositorioGabinete = repositorioGabinete;
    }

    async importarGabinetes() {
        try {
            var result = await this.repositorioGabinete.deleteTable('gabinete');
            var status = null;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                var desc = await this.repositorioGabinete.describe('gabinete');
                status = desc.Table.TableStatus;
                console.log(status);
            } while(status === 'DELETING' || status === 'ACtiVE');
            console.log( result + ' registros Excluidos');
        } catch (error) {
            if(error.name === "ResourceNotFoundException") {
                console.log('Tabela não encontrada.');
            } else {
                throw error;
            }
        }
        
        var result = await this.repositorioGabinete.createTable('gabinete');
        var status = null;
        do {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                var desc = await this.repositorioGabinete.describe('gabinete');
                status = desc.Table.TableStatus;
                console.log(status);
            } catch(error) {
                if(error.name === "ResourceNotFoundException") {
                    console.log('Tabela não encontrada.');
                } else {
                    throw error;
                }
            }
        } while(status !== 'ACTIVE')
        
        var gabinetes = await this.listarGabinetes();
        var count = await this.repositorioGabinete.batchInsert(gabinetes);
        console.log(gabinetes.length + ' gabinetes consultados e ' + count + ' gabinetes inseridos.')

    }

    async listarGabinetes() {
        var url = "https://dadosabertos.camara.leg.br/api/v2/deputados";
        const resp = await axios.get(url);
        return resp.data.dados;
    }
}

module.exports = ServicoImportacaoGabinete;