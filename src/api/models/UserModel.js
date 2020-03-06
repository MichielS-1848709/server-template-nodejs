const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Model = Sequelize.Model;

class UserModel extends Model {
    static init(sequelize, DataTypes) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: Sequelize.STRING(64),
                allowNull: false,
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

        }, { modelName: 'users', sequelize });

        this.addHook('beforeSave', account => {
            if(account.password) {
                const salt = bcrypt.genSaltSync(8);
                account.password = bcrypt.hashSync(account.password, salt);
            }
        });

        return this;
    }

    validatePassword(password) {
        return bcrypt.compare(password, this.password)
    }
}

module.exports = UserModel;