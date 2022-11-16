class RepositorioGabinete {

    constructor(db) {
        this.db = db;
    }

    async listarGabinetes() {
        var params = {
            TableName: 'gabinete',
            ProjectionExpression: "id, nome",
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
        var gabinetes = result.Items.map( item => {
            return {
                id: item.id.S,
                nome: item.nome.S,
            };
        });
        return gabinetes;
    }
}

module.exports = RepositorioGabinete;