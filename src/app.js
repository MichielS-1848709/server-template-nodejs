const bodyParser = require('body-parser');
const express = require ('express');
const passport = require('passport');


/** Routes imports **/
const accountRoutes = require('./api/routes/account.route');

/** Initialisation **/

const jwtStrategy = require('./api/middleware/jwt.strategy');
const app = express();
app.use(passport.initialize());

/** Middleware **/
passport.use(jwtStrategy);
app.use(bodyParser.json({type: '*/*', limit:'2mb'}));


/** Routes **/
app.use('/account', accountRoutes);


module.exports = app;