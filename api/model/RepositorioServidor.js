class RepositorioServidor {

    constructor(db) {
        this.db = db;
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
        
        const result  =  await new Promise((resolve, reject) => {
            this.db.scan(params, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
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
}

module.exports = RepositorioServidor;