const bodyParser = require('body-parser');
const express = require ('express');

/** Routes imports **/
const accountRoutes = require('./api/routes/userRoutes');

/** Initialisation **/

const app = express();

/** Middleware **/
app.use(bodyParser.json({type: '*/*', limit:'2mb'}));


/** Routes **/
app.use('/account', accountRoutes);


module.exports = app;