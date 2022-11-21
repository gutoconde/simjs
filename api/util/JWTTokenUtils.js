const jwt = require('jsonwebtoken');

const secret = process.env.SIM_SECRET_KEY;

module.exports.gerarToken = (id) => {
    
    var token = jwt.sign(
        { 'sub': id }, 
        secret
        //{expiresIn: 7200 } np
    );
    return token;
};

module.exports.decodeToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports.getId = (decodedToken) => {
    return decodedToken.sub;
}