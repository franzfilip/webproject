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
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

const { RootQueryType, RootMutationQueryType } = require("./schema");
const { User, Role } = require("./models/models");
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationQueryType
});

const verifyToken = (req, res, next) => {  
  jwt.verify(req.headers.authorization, 'secret', (err, decoded) => {
    if (err){      
      return res.send(401);
    }
    next();
  });
}
verifyToken.unless = unless;

app.use(express.json());

app.post('/auth', (req, res) => {
  login(req.body).then((token) => {
    if(token == false){
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
    res.send(token);
  });
});

app.use(verifyToken.unless({ path: ['/auth'] }));

app.use('/graphql', cors("*"), graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5000, () => console.log('Server Running'));

async function login(data){
  const userdata = await User.findOne({
    where: {
      name: data.username
    }
  });

  const roleData = await Role.findByPk(userdata.roleId);
  console.log(roleData);
  if (bcrypt.compareSync(data.password, userdata.pw)){
    const token = jwt.sign({ username: userdata.name, role: roleData.name }, 'secret');
    return token;
  }
  else{
    return false;
  }
}