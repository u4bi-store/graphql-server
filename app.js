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


    Mutation Query Insert

        mutation{
        
            addCustomer( name:"ub", email:"ub@gmail.com", age : 15 ){
                id,
                name,
                email
            }

        }


    Mutation Query Delete
                
        mutation{
        
            deleteCustomer(id:"4"){
                id
            }
  
        }


    Mutation Query Update

        mutation{
        
            editCustomer(id : "2", age: 22){
                id,
                age,
                name
            }
        
        }
        
        
*/