const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Account extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Date.now()
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Date.now()
            }

        }, {modelName: 'account', sequelize});
    }
}

module.exports = Account;