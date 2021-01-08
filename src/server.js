const express = require('express')
var { graphqlHTTP } = require('express-graphql');
var {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const app = express();

const { RootQueryType, RootMutationQueryType } = require("./schema");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationQueryType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))