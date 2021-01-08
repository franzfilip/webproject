const {DataTypes, Model} = require('sequelize');
var sequelize = require("../config");
const {attributeFields} = require('graphql-sequelize');
var { GraphQLObjectType } = require('graphql')
const { resolver } = require('graphql-sequelize');

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

const { Role, RoleObjectType } = require("./role");
// const { Company, CompanyObjectType } = require("./company");

User.belongsTo(Role);
// User.Company = User.belongsTo(Company, {as: "company"});
// User.associate = (models) => {
//     User.belongsTo(models.Company, {foreignKey: 'companyId'});
//     User.belongsTo(models.Role, {foreignKey: 'roleId', as: "role"});
// };

const UserObjectType = new GraphQLObjectType({
    name: 'user',
    fields: {...attributeFields(User)},
    // role: {
    //     type: RoleObjectType,
    //     resolve: resolver(User.Role)
    // }
});

module.exports = {
    User,
    UserObjectType
};