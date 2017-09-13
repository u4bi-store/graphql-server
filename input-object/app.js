const express = require('express');
const expressGraphQL = require('express-graphql');
const axios = require('axios');
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
    
} = require('graphql');


const BadgesType = new GraphQLObjectType({
    name : 'Badges',
    fields : () => ({
        id : { type : GraphQLString },
        name : { type : GraphQLString },
        level : { type : GraphQLInt }
    })
});

const ObjectsType = new GraphQLObjectType({
    name : 'Objects',
    fields : () => ({
        id    : { type : GraphQLString },
        history : { type : new GraphQLList(GraphQLString) },
        badge : { type : new GraphQLList(BadgesType) }
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        object :{
            type : ObjectsType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
            return axios.get('http://localhost:3000/objects/' + args.id)
                .then(res => res.data);
            }
        },
        //
        objects : {
            type : new GraphQLList(ObjectsType),
            resolve(parentValue, args){
                
                return axios.get('http://localhost:3000/objects')
                    .then(res => res.data);

            }
        }
    } 
});



// mutations

const inputBadgeType = new GraphQLInputObjectType({
    name: 'BadgeInput',
    fields: {
        name : { type : GraphQLString },
        level : { type : GraphQLInt }
    }
});


const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addObject : {
            type : ObjectsType,
            args : {
                history : { type : new GraphQLNonNull( new GraphQLList(GraphQLString) ) },
                badge : { type : new GraphQLNonNull( new GraphQLList(inputBadgeType) ) }                
            },
            resolve(parentValue, args){
                
                return axios.post('http://localhost:3000/objects', {
                    history : args.history,
                    badge : args.badge
                })
                .then(res => res.data);
            }
        }
        
    }
});


const schema = new GraphQLSchema({
    query : RootQuery,
    mutation
});

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
            object(id : "1"){
                id,
                history,
                badge {
                    name,
                    level
                }
            }
        }



        {
            objects{
                id,
                history,
                badge {
                    name,
                    level
                }
            }
        }




        mutation{
            addObject( 
                history : [
                    "Test Home1",
                    "Test Home2",
                    "Test Home3"
                ],
                badge : [
                    {
                        name : "테스트 휘장1",
                        level : 66
                    },
                    {
                        name : "테스트 휘장2",
                        level : 55
                    },                    
                ],
                 
            ){
                id,
                history,
                badge {
                    name,
                    level
                }
            }
        }

*/