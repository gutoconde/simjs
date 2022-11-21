const jwtUtil = require('./util/JWTTokenUtils');

module.exports = (req, res, next) => {
    const secret = process.env.SIM_SECRET_KEY;
    try {
        if(!req.headers.authorization) {
            var data = {
                'auth': false,
                'mensagem' : 'usuário não autenticado',
            };
            res.status(401).json(data);
            return;
        }
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwtUtil.decodeToken(token);
        req.id = jwtUtil.getId(decoded);
        next();
    }catch(err) {
        console.error(err.stack);
        var data = {
            'auth': false,
            'mensagem' : 'usuário não autenticado',
            'error' : err.message
        };
        res.status(401).json(data);
    }
};