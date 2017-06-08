var { graphql, buildSchema } = require('graphql');

/* graphql 언어를 사용해 스키마 생성 */
var schema = buildSchema(`
  type Query {
    u4bi : String
  }
`);

/* API 반환값 지정 */
var root = {
  u4bi : () => {
    return '나 불렀니';
  },
};

/* graphqL 쿼리'{ u4bi }'를 실행하고 회신값을 받음 */
graphql(schema, '{ u4bi }', root).then((resp) => console.log(resp));