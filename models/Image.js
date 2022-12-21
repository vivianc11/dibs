const { Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
  {
    img_url: {
      type: DataTypes.STRING,
    },
    item_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Item',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Image'      
  }
);

module.exports = Image;


 