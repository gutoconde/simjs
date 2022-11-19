const RepositorioBase = require("../model/RepositorioBase");

class RepositorioServidor extends RepositorioBase {

    constructor(db) {
        super(db);
    }

    async findByIdGabinete(idGabinete) {
        var params = {
            TableName: 'servidor',
            ProjectionExpression: "id, nome, idGabinete, codigoCargo",
            FilterExpression: "idGabinete = :idGabinete",
            ExpressionAttributeValues: {
                ":idGabinete": {S: idGabinete}
              },
        }
        const result  =  await this.scan(params);
        //Converterndo objetos
        var servidores = result.Items.map( item => {
            return {
                id: item.id.S,
                nome: item.nome.S,
                idGabinete: item.idGabinete.S,
                codigoCargo: item.codigoCargo.S,
            };
        });
        return servidores;
    }

    async insertList(servidores) {
        const PATTERN_URI_GABINETES = /https:\/\/dadosabertos.camara.leg.br\/api\/v2\/deputados\/(?<idGabinete>\d+)/;
        var prs = servidores.map( item => {
            const match = item.uriLotacao.match(PATTERN_URI_GABINETES);
            const idGabinete = match.groups['idGabinete'];
            var pr = {
                PutRequest : {
                    Item: {
                        'id' : {"S" : item.ponto},
                        'codigoCargo' : {"S" : item.cargo},
                        'idGabinete' : {'S': idGabinete},
                        'nome' : {'S': item.nome}
                    }
                } 
            }
            return pr;
        });
        
        if(prs.length <= 0) {
            return;
        }

        var count = 0;
        var insertCount = 0;
        while (count < prs.length) {
            var putReqs = prs.slice(count, count + 25);
            
            var params = {
                RequestItems: {},
                ReturnConsumedCapacity: "TOTAL"
            }
            params.RequestItems['servidor'] = putReqs;

            try {
                var result = await this.batchExecute(params);
                insertCount = insertCount + result;
                count = count + 25;
            } catch(error) {
                if(error.name === "ProvisionedThroughputExceededException") {
                    console.log('Erro de provisionaemnto de recursos. Nova tentativa será feita');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    console.error("Erro ao salvar servidores : " + error + " dados: " + JSON.stringify(params));
                    count = count + 25;
                }
            }
        }
        return insertCount;
    }
}

module.exports = RepositorioServidor;