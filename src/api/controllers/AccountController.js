const { AccountModel } = require('../models/Model');
const { validate } = require('../middleware/parameterValidator');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.fetchAll = (req, res) => {
    AccountModel.findAll()
        .then(accounts => {
            const status = accounts == null ? 404 : 200;
            res.status(status).send({
                status: 'success',
                data: { accounts: accounts },
                message: null
            });
        })
        .catch(() => {
            res.status(500).send({
                status: 'error',
                data: null,
                message: 'Internal Server Error'
            });
        })
};

module.exports.fetch = (req, res) => {
    const accountID = req.params.id;
    AccountModel.findByPk(accountID)
        .then(account => {
            const status = account == null ? 404 : 200;
            res.status(status).send({
                status: 'success',
                data: { account: account },
                message: null
            });
        })
        .catch(() => {
            res.status(500).send({
                status: 'error',
                data: null,
                message: 'Internal Server Error'
            });
        })
};



module.exports.add = (req, res, next) => {

    // Validate provided parameters
    if(!validate(req, res)) return;

    // Create new account
    AccountModel.create({name: req.body.name, email: req.body.email, password: req.body.password})
        .then(account => {
            res.status(201).send({
                status: 'success',
                data: { account: account },
                message: null
            });
        })
        .catch(() => {
            res.status(500).send({
                status: 'error',
                data: null,
                message: 'Internal Server Error'
            });
        })
};

module.exports.modify = (req, res) => {
    const accountID = req.params.id;
    const accountModification = req.body.account;

    if(!accountModification)
        return res.status(404).send({
            status: 'error',
            data: null,
            message: 'Required parameters not provided'
        });

    AccountModel.update(accountModification, {returning: true, where: {id: accountID}})
        .then(([accountID, [newAccount]]) => {
            const statusCode = newAccount == null ? 404 : 200;
            const statusMessage = newAccount == null ? 'fail' : 'success';

            res.status(statusCode).send({
                status: statusMessage,
                data: { account: newAccount },
                message: null
            });
        })
        .catch(() => {
            res.status(500).send({
                status: 'error',
                data: null,
                message: 'Internal Server Error'
            });
        });
};

module.exports.delete = (req, res) => {
    const accountID = req.params.id;

    AccountModel.destroy({where: {id: accountID}})
        .then(accountsDeleted => {
            const statusCode = accountsDeleted === 0 ? 404 : 200;
            const statusMessage = accountsDeleted === 0 ? 'fail' : 'success';

            res.status(statusCode).send({
                status: statusMessage,
                data: null,
                message: null
            });
        })
        .catch(() => {
            res.status(500).send({
                status: 'error',
                data: null,
                message: 'Internal Server Error'
            });
        });
};

module.exports.authenticate = (req, res) => {

    // Validate provided parameters
    if(!validate(req, res)) return;

    // Authenticate account
    AccountModel.findOne({where: { email: req.body.email }})
        .then((account) => {

            const payload = {
                id: account.id,
                name: account.name
            };

            const privateKey = fs.readFileSync(process.env.JWT_KEY_PATH, 'utf-8');

            const signOptions = {
                issuer: process.env.JWT_PROVIDER,
                expiresIn: process.env.JWT_EXPIRATION,
                algorithm: "RS256"
            };

            const token = jwt.sign(payload, privateKey, signOptions);

            return res.status(200).send({
                status: 'success',
                data: { jwt: token},
                message: null
            });
        });
};