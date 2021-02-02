const graphql = require('graphql')
const graphql_iso_date = require('graphql-iso-date')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql
const {
  GraphQLDate
} = graphql_iso_date

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLDate }
  })
})

module.exports = TransactionType
