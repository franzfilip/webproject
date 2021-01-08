const {DataTypes, Model} = require('sequelize');
var sequelize = require("../config");
const {attributeFields, resolver} = require('graphql-sequelize');
var { GraphQLObjectType, GraphQLList } = require('graphql');

var Company = sequelize.define('company', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false
    }
});

const { Product, ProductObjectType } = require("./product");
const { User, UserObjectType } = require("./user");

Company.Products = Company.hasMany(Product, {as: "companyProducts"});
Company.Users = Company.hasMany(User, {as: "companyUsers"});

// Company.associate = (models) => {
//     Company.hasMany(Product, {as: "companyProducts"});
//     Company.hasMany(User, {as: "companyUsers"});
// }

const CompanyObjectType = new GraphQLObjectType({
    name: 'company',
    fields: {
        ...attributeFields(Company),
        products: {
            type: new GraphQLList(ProductObjectType),
            resolve: resolver(Company.Products)
        },
        users: {
            type: new GraphQLList(UserObjectType),
            resolve: resolver(Company.Users)
        }
    }
});

module.exports = {
    Company,
    CompanyObjectType
};