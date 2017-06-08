const restify = require('restify');

const graphqlHTTP = require('express-graphql');

const app = restify.createServer();

const { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    u4bi : String,
    dudugy : String
  }
`);

/* API 반환값 지정 */
var root = {
  u4bi : () => {
    return '나 불렀니';
  },
  dudugy : () => {
    return '더더더기'
  }
};

app.post('/graphql', graphqlHTTP({

  schema: schema,
  rootValue: root,
  graphiql: false

}));

app.get('/graphql', graphqlHTTP({
  
  schema: schema,
  rootValue: root,
  graphiql: true

}));

app.listen(4000);
console.log('run server');


/**

{
	u4bi
}
{
    dudugy
}

 */