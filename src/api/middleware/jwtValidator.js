const { verify } = require('../utils/jwtUtil');


notAuthorized = (res) => {
    res.status(401).send({
        status: 'fail',
        data: null,
        message: 'Not authorized'
    })
};

module.exports.verify = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token) {
        if(token.startsWith('Bearer '))
            token = token.slice(7, token.length);

        const tokenIsValid = verify(token);

        if(tokenIsValid)
            next();
        else
            notAuthorized(res);

    } else {
        notAuthorized(res);
    }


};