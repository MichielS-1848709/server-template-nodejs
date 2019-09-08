const { body } = require('express-validator');
const { validationResult } = require('express-validator/check');
const { AccountModel } = require('../models/model');

module.exports.scan = (method) => {
    switch(method) {
        case 'account-add': {
            return [
                body('email', 'Invalid email format').exists().isEmail().normalizeEmail(),
                body('email').exists().custom(async email => {
                    const exists = await AccountModel
                        .findOne({where: {email: email}})
                        .then(account => { return account != null });

                    if(exists) throw new Error('Email is already in use');
                }),
                body('password', 'Password must have a minimum length of 5 characters').isLength({ min: 5 }),
                body('name', 'Name is a required parameter').exists()
            ]
        }
        case 'account-authenticate':
            return [
                body('password', 'Password is a required parameter').exists(),
                body('email', 'Invalid email format').isEmail().custom(async (email, {req}) => {
                    if(req.body.email && req.body.password) {
                        const authenticated = await AccountModel
                            .findOne({where: {email: req.body.email}})
                            .then(account => {
                                if(account && req.body.password)
                                    return account.validatePassword(req.body.password);
                                return false;
                            });

                        if(!authenticated)
                            throw new Error('Your email or password is wrong');
                    }
                })
            ]
    }
};

module.exports.validate = (req, res) => {
    const errors = validationResult(req);
    const isEmpty = errors.isEmpty();

    console.log(errors);

    if(!isEmpty) {
        res.status(404).send({
            status: 'fail',
            data: errors,
            message: 'Required parameters not provided'
        });
    }

    return isEmpty
};