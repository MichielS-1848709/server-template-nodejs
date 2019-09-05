const { Account } = require('../models/index');

module.exports.fetchAll = (req, res) => {
    Account.findAll()
        .then(accounts => {
            console.log(accounts);
            if(!accounts)
                res.send('Empty');
            else
                res.status(200).send(accounts);

        })
        .catch(error => {
            res.send('Error, look console');
            console.log(error);
        })
};

module.exports.add = (req, res) => {
    Account.create({name: req.body.name, email: req.body.email})
        .then(account => res.status(200).send(account))
        .catch((error) => console.log(error))
};