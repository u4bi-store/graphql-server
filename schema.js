const axios = require('axios');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


/* hard code

    const customers = [
        { id : '1', name : 'John Gang', email : 'gang@gmail.com', age : 14 },

        { id : '2', name : 'John Kim', email : 'kim@gmail.com', age : 15 },

        { id : '3', name : 'John Min', email : 'min@gmail.com', age : 18 },

        { id : '4', name : 'John Yu', email : 'yu@gmail.com', age : 18 }            
    ];

*/

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
            /*
            
            for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        
                        return customers[i];

                    }
                }
            }

            */

            return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data);

            }
        },
        //
        customers : {
            type : new GraphQLList(CustomerType),
            resolve(parentValue, args){
                
                // return customers;
                return axios.get('http://localhost:3000/customers')
                    .then(res => res.data);

            }
        }
    } 
});

// mutations

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addCustomer : {
            type : CustomerType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                email : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) } 
            },
            resolve(parentValue, args){
                
                return axios.post('http://localhost:3000/customers', {
                    name : args.name,
                    email : args.email,
                    age : args.age

                })
                .then(res => res.data);
            }
        },
        //
        deleteCustomer : {
            type : CustomerType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                
                return axios.delete('http://localhost:3000/customers/' + args.id)
                .then(res => res.data);

            }
        },
        //
        editCustomer : {
            type : CustomerType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)},
                name : { type : GraphQLString },
                email : { type : GraphQLString },
                age : { type : GraphQLInt } 
            },
            resolve(parentValue, args){
                
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                .then(res => res.data);
            }
        },        
    }
});


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation
});