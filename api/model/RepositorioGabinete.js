const RepositorioBase = require("../model/RepositorioBase");

class RepositorioGabinete extends RepositorioBase{

    constructor(db) {
        super(db);
    }

    async listarGabinetes() {
        var params = {
            TableName: 'gabinete',
            ProjectionExpression: "id, nome",
        }
        
        const result  =  await this.scan(params);
        //Converterndo objetos
        var gabinetes = result.Items.map( item => {
            return {
                id: item.id.S,
                nome: item.nome.S,
            };
        });
        return gabinetes;
    }

    insert(gabinete) {
        var params = {
            TableName: 'gabinete',
            Item: {
                'id' : {'S' : gabinete.id},
                'nome' : {'S' : gabinete.nome}
            }
        };
        result = new Promise((resolve, reject) => {
            this.db.putItem(params, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return result;
    }

    async batchInsert(gabinetes) {

        var prs = gabinetes.map( item => {
            var pr = {
                PutRequest : {
                    Item: {
                        'id' : {"S" : item.id.toString()},
                        'nome' : {'S': item.nome}
                    }
                } 
            }
            return pr;
        });

        if(prs.length <= 0) {
            return 0;
        }

        var count = 0;
        var insertCount = 0;
        while (count < prs.length) {
            var putReqs = prs.slice(count, count + 25);
            
            var params = {
                RequestItems: {},
                ReturnConsumedCapacity: "TOTAL"
            }
            params.RequestItems['gabinete'] = putReqs;

            try {
                var result = await this.batchExecute(params);
                insertCount = insertCount + result;
                count = count + 25;
            } catch(error) {
                if(error.name === "ProvisionedThroughputExceededException") {
                    console.log('Erro de provisionaemnto de recursos. Nova tentativa será feita');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    console.error("Erro ao salvar gabinetes : " + error + " dados: " + JSON.stringify(params));
                    count = count + 25;
                }
            }
        }
        return insertCount;
    }
}

module.exports = RepositorioGabinete;