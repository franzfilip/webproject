const {DataTypes, Model} = require('sequelize');
var sequelize = require("../config");
const {attributeFields} = require('graphql-sequelize');
var { GraphQLObjectType } = require('graphql');

var Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        field: "companyId"
    },
    name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        field: "price",
        allowNull: false
    }
});

Product.associate = (models) => {
    Product.belongsTo(models.Company);
    // Product.belongsTo(models.Company, {
    //     foreignKey: "companyId",
    //     as: "company"
    // });
};

const ProductObjectType = new GraphQLObjectType({
    name: 'product',
    fields: {
        ...attributeFields(Product)
    }
});

module.exports = {
    Product,
    ProductObjectType
};