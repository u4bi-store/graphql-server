const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query{
        u4bi : String
    }

    type Schema {
        query : Query
    }
`);


const query = `
    query goodFunction {
        u4bi
    }
`;


const resolvers = {
    u4bi : () => 'good'
};

graphql(schema, query, resolvers)
    .then( (result) => console.log('결과값 : ', result))
    .catch( (error) => console.log('에러 : ',error));