class RepositorioBase {

    constructor(db) {
        this.db = db;
    }

    describe(tableName) {
        const result = new Promise((resolve, reject) => {
            var params = {
                TableName: tableName
            };
            
            this.db.describeTable(params, function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                } 
            });
        });
        return result;
    }

    deleteTable(tableName) {
        var params = {
            TableName : tableName
        };
        const result = new Promise((resolve, reject) => {
            this.db.deleteTable(params, function(err, data) {
                if (err) {
                    reject(err);
                    console.error(`Erro ao deletar tabela ${tableName} : ${JSON.stringify(err)}`);
                } else {
                    resolve(data);
                }
            });
        });
        return result;
    }

    async createTable(tableName) {
        var params = {
            TableName : tableName,
            KeySchema: [       
                { AttributeName: "id", KeyType: "HASH"},
                
            ],
            AttributeDefinitions: [       
                { AttributeName: "id", AttributeType: "S" },
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 10, 
                WriteCapacityUnits: 10
            }
        };
        const result = new Promise((resolve, reject) => {
            this.db.createTable(params, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return result;            
    }

    batchExecute(params) {
        const result = new Promise((resolve, reject) => {
            this.db.batchWriteItem(params, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.ConsumedCapacity[0].CapacityUnits);
                }
            });
        });
        return result;
    }

    scan(params) {
        const result  =  new Promise((resolve, reject) => {
            this.db.scan(params, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return result;
    }

    async deleteAll(tableName) {
        var result = await this.scan({TableName: tableName, AttributesToGet: ['id']});
        
        if(result === null || result.Items.length <= 0) {
            return 0;
        }

        var drs = result.Items.map( item => {
            var dr = {
                DeleteRequest : {
                    Key: {
                        'id' : {"S" : item.id.S} 
                    }
                } 
            }
            return dr;
        });
        
        if(drs.length <= 0) {
            return 0;
        }
        var count = 0;
        var deleteCount = 0;
        while (count < drs.length) {
            var deleteReqs = drs.slice(count, count + 25);
            var params = {
                RequestItems: {},
                ReturnConsumedCapacity: "TOTAL"
            };
            params.RequestItems[tableName] = deleteReqs;
            try {
                var result = await this.batchExecute(params);
                deleteCount = deleteCount + result;
            } catch(error) {
                console.error("Erro ao excluir linhas da tabela " + tableName + " : " + error + " dados: " + JSON.stringify(params)) ;
            } finally {
                count = count + 25;
            }
        }
        return deleteCount;
    }
}

module.exports = RepositorioBase;