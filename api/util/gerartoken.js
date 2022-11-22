require('dotenv').config();
const jwtUtil = require( './util/JWTTokenUtils');


if(process.argv.length < 3) {
    process.exit();
}
var input = process.argv[2];
var token = jwtUtil.gerarToken(input);
console.log(`Token gerado: ${token}`);
