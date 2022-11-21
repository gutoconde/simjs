'use strict';

const axios = require('axios');

class ServicoImportacaoServidor {

    constructor(repositorioServidor) {
        this.repositorioServidor = repositorioServidor;
    }

    async importarServidores() {
        try {
            var result = await this.repositorioServidor.deleteTable('servidor');
            var status = null;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                var desc = await this.repositorioServidor.describe('servidor');
                status = desc.Table.TableStatus;
            } while(status === 'DELETING' || status === 'ACtiVE');
            console.log( result + ' registros Excluidos');
        } catch (error) {
            if(error.name === "ResourceNotFoundException") {
                console.log('Tabela não encontrada.');
            } else {
                throw error;
            }
        } 
        
        var result = await this.repositorioServidor.createTable('servidor');
        var status = null;
        do {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                var desc = await this.repositorioServidor.describe('servidor');
                status = desc.Table.TableStatus;
            } catch(error) {
                if(error.name === "ResourceNotFoundException") {
                    console.log('Tabela servidor não encontrada.');
                } else {
                    throw error;
                }
            }
        } while(status !== 'ACTIVE')
        
        var servidores = await this.listarServidores();
        var sps = servidores.filter(servidor => {
            return servidor.codGrupo === 6;
        });

        //Removendo servidores repetidos
        sps = [...new Map(sps.map(sp => [sp.ponto, sp])).values()];
        var count = await this.repositorioServidor.insertList(sps);
        console.log(sps.length + ' servidores consultados e ' + count + ' servidores inseridos.')
    }

    async listarServidores() {
        var url = "https://dadosabertos.camara.leg.br/arquivos/funcionarios/json/funcionarios.json";
        const resp = await axios.get(url);
        return resp.data.dados;
    }

}

module.exports = ServicoImportacaoServidor;