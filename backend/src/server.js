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
const secret = "secret";

const verifyToken = (req, res, next) => {  
  jwt.verify(req.headers.authorization, secret, (err, decoded) => {
    if (err){      
      return res.sendStatus(401);
    }
    next();
  });
}
verifyToken.unless = unless;

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());

app.post('/auth', cors({ credentials: true, origin: 'http://localhost:4200' }),(req, res) => {
  login(req.body).then((token) => {
    if(token == false){
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
    res.send(token);
  });
});

//app.use(verifyToken.unless({ path: ['/auth'] }));

app.use('/graphql', cors({ credentials: true, origin: 'http://localhost:4200' }), graphqlHTTP({
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

  console.log(userdata);
  const roleData = await Role.findByPk(userdata.roleId);
  if (bcrypt.compareSync(data.password, userdata.pw)){
    const token = jwt.sign({ username: userdata.name, role: roleData.name }, secret);
    return token;
  }
  else{
    return false;
  }
}