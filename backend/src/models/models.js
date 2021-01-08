const {DataTypes, Model} = require('sequelize');
var sequelize = require("../config");
const {attributeFields, resolver} = require('graphql-sequelize');
var { GraphQLObjectType, GraphQLList } = require('graphql');

var CompanyObjectType, ProductObjectType, UserObjectType, RoleObjectType;

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

var Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true
    },
    // companyId: {
    //     type: DataTypes.INTEGER,
    //     field: "companyId"
    // },
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

var User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false
    },
    pw: {
        type: DataTypes.STRING,
        field: "pw",
        allowNull: false
    }
});

var Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        field: "type",
        allowNull: false
    }
});

Company.Products = Company.hasMany(Product, {as: "companyProducts"});
Company.Users = Company.hasMany(User, {as: "companyUsers"});

ProductObjectType = new GraphQLObjectType({
    name: 'product',
    fields: {
        ...attributeFields(Product)
    }
});

Role.Users = Role.hasMany(User);

RoleObjectType = new GraphQLObjectType({
    name: 'role',
    fields: {
        ...attributeFields(Role)
    },
});

User.Role = User.belongsTo(Role, { as: "role" });

UserObjectType = new GraphQLObjectType({
    name: 'user',
    fields: {
        ...attributeFields(User),
        role: {
            type: RoleObjectType,
            resolve: resolver(User.Role)
        }
    }
});

CompanyObjectType = new GraphQLObjectType({
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
    CompanyObjectType,
    Product,
    ProductObjectType,
    User,
    UserObjectType,
    Role,
    RoleObjectType
};