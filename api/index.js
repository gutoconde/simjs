const serverless = require('serverless-http');
require('dotenv').config();
var express = require('express');
var app = express();
var dbMiddleWare = require('./integracao/DatabaseMiddleware');
var db = require("./integracao/Database.js")

const port = process.env.VERBOS_API_PORT || 3000;

app.use(dbMiddleWare(db));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

var routes = require('./routes');
routes(app);


if(process.argv[2] && process.argv[2] === 'local') {
    app.listen(port, () => {
        console.log(`Servico iniciado na porta ${port}!`);
    });
} else {
    module.exports.handler = serverless(app);
}
