var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLFloat
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
    //   addProduct: {
    //       type: ProductObjectType,
    //       args: {
    //         productId: { type: GraphQLInt },
    //         name: { type: GraphQLString },
    //         price: { type: GraphQLFloat}
    //       },
    //       resolve: (parents, args) => Product.update({

    //       })
    //   }
    })
  });

module.exports = {
    RootQueryType,
    RootMutationQueryType
};