'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.SubCategory, {
        as: "subCategory",//como la vamos a llamar
        foreingKey: "subCategoryId" //por las dudas especificamos la columna de la foreingKey
      })

      Product.belongsTo(model.Label, {
        as: "label",
        foreingKey: "labelId"
      })

      Product.hasMany(models.ProductImages, {
        as: "images",
        foreingKey: "productId"
      })

      Product.belongsToMany(models.User, {
        as: "cartProduct",
        through: "Cart",
        foreignKey: "UserId",
        otherKey: "productId"
      })

      Product.belongsToMany(models.User, {
        as: "favorite",
        through: "Favorite",
        foreignKey: "UserId",
        otherKey: "productId"
      })

    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    expiration: DataTypes.DATE,
    cuantity: DataTypes.INTEGER,
    labelId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};