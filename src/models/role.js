const {DataTypes, Model} = require('sequelize');
var sequelize = require("../config");
const {attributeFields, resolver} = require('graphql-sequelize');
var { GraphQLObjectType, GraphQLList } = require('graphql');

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

const { User, UserObjectType } = require("./user");

Role.Users = Role.hasMany(User);

const RoleObjectType = new GraphQLObjectType({
    name: 'role',
    fields: {
        ...attributeFields(Role),
        users: {
            type: new GraphQLList(UserObjectType),
            resolve: resolver(Role.Users)
        }
    },
});

module.exports = {
    Role,
    RoleObjectType
};