const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema   : schema,
    graphiql : true
}));

app.listen(4000, ()=> {
    console.log('on port 4000..');
});


/*

    {
        profile(name: "u4bi") {
            login
            id
            email
            html_url
            public_repos
            followers
            following
        }
    }
    
*/