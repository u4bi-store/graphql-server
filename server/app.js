const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema   : schema,
    graphiql : true
}));

app.listen(4000, ()=> {
    console.log('server is running on port 4000..');
});


/* 

    http://localhost:4000/graphql

    Query 

        {
            customer(id : "4"){
                name,
                email,
                age
            }
        }



        {
            customers {
              id,
              name,
              email,
              age
            }
        }

*/