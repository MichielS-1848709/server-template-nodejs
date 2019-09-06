const { Account: AccountController } = require('../models/model');

module.exports.fetchAll = (req, res) => {
    AccountController.findAll()
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
    AccountController.findByPk(accountID)
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

module.exports.add = (req, res) => {
    const account = req.body;

    if(!account.email || !account.name)
        return res.status(404).send({
            status: 'error',
            data: null,
            message: 'Required parameters not provided'
        });

    AccountController.create({name: req.body.name, email: req.body.email})
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

    AccountController.update(accountModification, {returning: true, where: {id: accountID}})
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

    AccountController.destroy({where: {id: accountID}})
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
    res.status(200).send('Authenticated');
};