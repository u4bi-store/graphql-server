const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// hard code 
const customers = [
    { id : '1', name : 'John Gang', email : 'gang@gmail.com', age : 14 },

    { id : '2', name : 'John Kim', email : 'kim@gmail.com', age : 15 },

    { id : '3', name : 'John Min', email : 'min@gmail.com', age : 18 },

    { id : '4', name : 'John Yu', email : 'yu@gmail.com', age : 18 }            
];

const CustomerType = new GraphQLObjectType({
    name : 'Customer',
    fields : () => ({
        id    : { type : GraphQLString },
        name  : { type : GraphQLString },
        email : { type : GraphQLString },
        age   : { type : GraphQLInt}
    }) 
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        customer :{
            type : CustomerType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        
                        return customers[i];

                    }
                }
            }
        } 
        //
    } 
});

module.exports = new GraphQLSchema({
    query : RootQuery
});