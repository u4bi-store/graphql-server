const express = require('express');
const expressGraphQL = require('express-graphql');
const axios = require('axios');
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');




const BoardsType = new GraphQLObjectType({
    name : 'Boards',
    fields : () => ({
        id    : { type : GraphQLString },
        writer : { type : GraphQLString },
        title : { type : GraphQLString },                
        content  : { type : GraphQLString }
    }) 
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        board :{
            type : BoardsType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
            return axios.get('http://localhost:3000/boards/' + args.id)
                .then(res => res.data);
            }
        },
        //
        boards : {
            type : new GraphQLList(BoardsType),
            resolve(parentValue, args){
                
                return axios.get('http://localhost:3000/boards')
                    .then(res => res.data);

            }
        }
    } 
});


// mutations

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addBoard : {
            type : BoardsType,
            args : {

                writer : { type : new GraphQLNonNull(GraphQLString) },
                title : { type : new GraphQLNonNull(GraphQLString) },                               
                content : { type : new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args){
                
                return axios.post('http://localhost:3000/boards', {
                    writer : args.writer,
                    title : args.title,
                    content : args.content

                })
                .then(res => res.data);
            }
        },
        //
        deleteBoard : {
            type : BoardsType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                
                return axios.delete('http://localhost:3000/boards/' + args.id)
                .then(res => res.data);

            }
        },
        //
        editBoard : {
            type : BoardsType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)},
                writer : { type : GraphQLString },
                title : { type : GraphQLString },
                content : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
                return axios.patch('http://localhost:3000/boards/' + args.id, args)
                .then(res => res.data);
            }
        },        
    }
});



const schema = new GraphQLSchema({
    query : RootQuery,
    mutation
});

const app = express();


app.use('/graphql', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});

app.use('/graphql', expressGraphQL({
    schema   : schema,
    graphiql : true
}));

app.listen(7778, ()=> {
    console.log('on port 7778..');
});



/*

        {
            board(id : "1"){
                id,
                writer,		
                title,
                content
            }
        }



        {
            boards{
                id,
                writer,		
                title,
                content
            }
        }



        mutation{
            addBoard( writer:"aaa", title : "aaa", content : "aaa" ){
                id,
                writer,		
                title,
                content
            }
        }
        


        mutation{
            editBoard(id:"1", title : "edit title"){
                id,
                writer,
                title,
                content
            }
        }
        


        mutation{
            deleteBoard(id:"1"){
                id
            }
        }
          
*/