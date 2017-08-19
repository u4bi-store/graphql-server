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




const TodosType = new GraphQLObjectType({
    name : 'Todos',
    fields : () => ({
        id    : { type : GraphQLString },
        content  : { type : GraphQLString }
    }) 
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        todo :{
            type : TodosType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
            return axios.get('http://localhost:3000/todos/' + args.id)
                .then(res => res.data);
            }
        },
        //
        todos : {
            type : new GraphQLList(TodosType),
            resolve(parentValue, args){
                
                return axios.get('http://localhost:3000/todos')
                    .then(res => res.data);

            }
        }
    } 
});


// mutations

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addTodo : {
            type : TodosType,
            args : {
                content : { type : new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args){
                
                return axios.post('http://localhost:3000/todos', {
                    content : args.content

                })
                .then(res => res.data);
            }
        },
        //
        deleteTodo : {
            type : TodosType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                
                return axios.delete('http://localhost:3000/todos/' + args.id)
                .then(res => res.data);

            }
        },
        //
        editTodo : {
            type : TodosType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)},
                content : { type : GraphQLString }
            },
            resolve(parentValue, args){
                
                return axios.patch('http://localhost:3000/todos/' + args.id, args)
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


app.use('/graphql', expressGraphQL({
    schema   : schema,
    graphiql : true
}));

app.listen(4000, ()=> {
    console.log('on port 4000..');
});


/* 

        {
            todo(id : "1"){
                 
                content
            }
        }



        {
            todos {
                 
                content
            }
        }




        mutation{
            addTodo(content : "test test" ){
                id,
                content
            }
        }



        mutation{
            deleteTodo(id : "2"){
                id
            }
        }



        mutation{
            editTodo(id : "1" , content : "edit test" ){
                id,
                content
            }
        }



*/