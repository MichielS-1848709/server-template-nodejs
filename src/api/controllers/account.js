const { Account } = require('../models/index');

module.exports.fetchAll = (req, res) => {
    Account.findAll()
        .then(accounts => {
            if(accounts)
                res.send('Empty');
            else
                res.send(accounts);
        })
        .catch(error => {
            res.send('Error, look console');
            console.log(error);
        })
};

module.exports.add = (req, res) => {
    Account.create({ name: req.body.name, email: req.body.email})
};