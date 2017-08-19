const axios = require('axios');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const GithubProfileType = new GraphQLObjectType({
    name : 'Profile',
    fields : () => ({
        "login": { type : GraphQLString },
        "id": { type : GraphQLInt },
        "avatar_url": { type : GraphQLString },
        "gravatar_id": { type : GraphQLString },
        "url": { type : GraphQLString },
        "html_url": { type : GraphQLString },
        "followers_url": { type : GraphQLString },
        "following_url": { type : GraphQLString },
        "gists_url": { type : GraphQLString },
        "starred_url": { type : GraphQLString },
        "subscriptions_url": { type : GraphQLString },
        "organizations_url": { type : GraphQLString },
        "repos_url": { type : GraphQLString },
        "events_url": { type : GraphQLString },
        "received_events_url": { type : GraphQLString },
        "type": { type : GraphQLString },
        "site_admin": { type : GraphQLBoolean },
        "name": { type : GraphQLString },
        "company": { type : GraphQLString },
        "blog": { type : GraphQLString },
        "location": { type : GraphQLString },
        "email": { type : GraphQLString },
        "hireable": { type : GraphQLString },
        "bio": { type : GraphQLString },
        "public_repos": { type : GraphQLInt },
        "public_gists": { type : GraphQLInt },
        "followers": { type : GraphQLInt },
        "following": { type : GraphQLInt },
        "created_at": { type : GraphQLString },
        "updated_at": { type : GraphQLString }
        
    }) 
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        profile :{
            type : GithubProfileType,
            args : {
                name : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
                return axios.get(`https://api.github.com/users/`+args.name)
                    .then(res => res.data);

            }
        }
        
    } 
});

module.exports = new GraphQLSchema({
    
    query : RootQuery

});