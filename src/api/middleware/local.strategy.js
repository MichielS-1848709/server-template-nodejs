const { Strategy } = require('passport-local');
const { Account } = require('../models/model');

const LocalStrategy = new Strategy((username, password, done) => {
    Account.findOne({email: username})
        .then((account) => {
            if(!account)
                return done(null, false, {message: 'No such account found'});

            if(account.validatePassword(password))
                return done(null, false, {message: 'Incorrect password'});

            return done(null, account);
        })
        .catch((error) => {
            done(error);
        })
});

module.exports = LocalStrategy;