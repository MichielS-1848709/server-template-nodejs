const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        acquire: 1000000,
        idle: 10.000
    }
});

const AccountModel = require('./account');

const models = {
    Account: AccountModel.init(sequelize, Sequelize)
};

sequelize.sync().then(() => {
    console.log('- PostgreSQL Initialized & Connected -');
});

const db = { ...models, sequelize };

module.exports = db;



