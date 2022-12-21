const { Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        image_url: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        giver_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Giver',
                key: 'id',
            },
        },
        is_dibbed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Item'      
    }
);

module.exports = Item;

