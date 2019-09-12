const jwt = require('jsonwebtoken');
const fs = require('fs');

// Encryption & Decryption Tool
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf-8');
const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf-8');

module.exports.sign = (payload) => {

    const signOptions = {
        issuer: process.env.JWT_PROVIDER,
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: "RS256"
    };

    const token = jwt.sign(payload, privateKey, signOptions);

    return cryptr.encrypt(token);
};

module.exports.verify = (token) => {
    const verifyOptions = {
        issuer: process.env.JWT_PROVIDER,
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: "RS256"
    };

    const decryptedToken = cryptr.decrypt(token);

    try{
        return jwt.verify(decryptedToken, publicKey, verifyOptions);
    } catch (err){
        return false;
    }
};

module.exports.decode = (token) => {
    const decryptedToken = cryptr.decrypt(token);

    // Returns null when invalid
    return jwt.decode(decryptedToken, {complete: true});
};