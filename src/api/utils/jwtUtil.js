const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf-8');
const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf-8');

module.exports.sign = (payload) => {

    const signOptions = {
        issuer: process.env.JWT_PROVIDER,
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: "RS256"
    };

    return jwt.sign(payload, privateKey, signOptions);
};

module.exports.verify = (token) => {
    const verifyOptions = {
        issuer: process.env.JWT_PROVIDER,
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: "RS256"
    };

    try{
        return jwt.verify(token, publicKey, verifyOptions);
    } catch (err){
        return false;
    }
};

module.exports.decode = (token) => {
    // Returns null when invalid
    return jwt.decode(token, {complete: true});
};