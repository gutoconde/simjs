class RepositorioCargo {

    constructor(db) {
        this.db = db;
    }

    async listarCargos() {
        var params = {
            TableName: 'cargo',
            ProjectionExpression: "codigo, historicosVencimentoCargo",
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
        var cargos = result.Items.map( item => {
            var cargo = {
                codigo: item.codigo.S
            };
            var historicos = item.historicosVencimentoCargo.L.map(hist => {
                    var historico = {
                        vencimento: hist.M.vencimento.N,
                        grg: hist.M.grg.N,
                        dataInicio: hist.M.dataInicio.S,
                        dataFim: hist.M.dataFim.NULL ? null : hist.M.dataFim.NULL,
                        dataCancelamento: hist.M.dataCancelamento.NULL ? null : hist.M.dataCancelamento.NULL
                    }
                    return historico;
            });
            cargo.historicosVencimentoCargo = historicos;
            return cargo;
        });
        return cargos;
    }
}

module.exports = RepositorioCargo;