var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLBoolean
    }
    = require('graphql');
const { resolver } = require('graphql-sequelize');

const {
    Company,
    CompanyObjectType,
    Product,
    ProductObjectType,
    User,
    UserObjectType,
    Role,
    RoleObjectType
}
= require ("./models/models");

const RootQueryType = new GraphQLObjectType({
  name: "Root",
  fields: () => ({
    company: {
        type: CompanyObjectType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => Company.findByPk(args.id)
    },
    companies: {
        type: new GraphQLList(CompanyObjectType),
        resolve: resolver(Company, { list: true })
    },
    product: {
        type: ProductObjectType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => Product.findByPk(args.id)
    },
    products: {
        type: new GraphQLList(ProductObjectType),
        resolve: resolver(Product, { list: true })
    },
    user: {
        type: UserObjectType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => User.findByPk(args.id)
    },
    users: {
        type: new GraphQLList(UserObjectType),
        resolve: resolver(User, { list: true })
    },
    role: {
        type: RoleObjectType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: (parent, args) => Role.findByPk(args.id)
    },
    roles: {
        type: new GraphQLList(RoleObjectType),
        resolve: resolver(Role, { list: true })
    }
  })
});

const RootMutationQueryType = new GraphQLObjectType({
    name: "Muation",
    fields: () => ({
        addCompany: {
            type: CompanyObjectType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: (parent, args) => Company.create({name: args.name})
        },
        addProduct: {
            type: ProductObjectType,
            args: {
                companyId: { type: GraphQLInt },
                name: { type: GraphQLString },
                price: { type: GraphQLFloat}
            },
            resolve: (parents, args) => Product.create({
                companyId: args.companyId,
                name: args.name,
                price: args.price
            })
        },
        updateProduct: {
            type: ProductObjectType,
            args: {
                productId: { type: GraphQLInt },
                name: { type: GraphQLString },
                price: { type: GraphQLFloat}
            },
            resolve: (parents, args) => {
                Product.update({
                    name: args.name,
                    price: args.price
                },
                {
                    where: {
                        id: args.productId
                    }
                });
                return Product.findByPk(args.productId);
            }
        },
        deleteProduct: {
            type: GraphQLBoolean,
            args: {
                productId: { type: GraphQLInt }
            },
            resolve: (parents, args) => {
                Product.destroy({
                    where: {
                        id: args.productId
                    }
                });
                return true;
            }
        },
        addUser: {
            type: UserObjectType,
            args: {
                companyId: { type: GraphQLInt },
                name: { type: GraphQLString },
                roleId: { type: GraphQLInt }
            },
            resolve: (parents, args) => User.create({
                companyId: args.companyId,
                name: args.name,
                pw: "$2a$10$vhRzeVxiWLhBe1ldXnCkIeH7I/Z19jsTmYI9IW3sIXwp.oqTY7/G2",
                roleId: args.roleId
            })
        },
        updateUser: {
            type: UserObjectType,
            args: {
                userId: { type: GraphQLInt },
                name: { type: GraphQLString },
                roleId: { type: GraphQLInt }
            },
            resolve: (parents, args) => {
                User.update({
                    name: args.name,
                    roleId: args.roleId
                },
                {
                    where: {
                        id: args.userId
                    }
                });
                return User.findByPk(args.userId);
            }
        }
    })
  });


module.exports = {
    RootQueryType,
    RootMutationQueryType
};