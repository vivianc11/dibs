const { Model, DataTypes} = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

class Giver extends Model {
    // Option of using an Instance Model to check hashed password with bcrypt:
    // checkPassword(loginPassword) {
    //     return bcrypt.compareSync(loginPassword, this.password)
    // }
}

Giver.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Requires a length of at least 4 characters for the password
                len: [4]
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },
    },
    {
        hooks: {
            // Use hooks to alter data before it is adding to and updating the database
            beforeCreate: async(newUserData) => {
                // Use bcrypt npm package to hash the password with 10 salt characters
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }, 
            beforeUpdate: async(updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }
        }, 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true, 
        modelName: 'Giver'       
    }
);

module.exports = Giver;