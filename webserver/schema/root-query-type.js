const graphql = require('graphql')
const graphql_iso_date = require('graphql-iso-date')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const {
  GraphQLDate
} = graphql_iso_date
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        date: { type: GraphQLDate},
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    },
    allTransactions: {
      type: GraphQLList(TransactionType),
      resolve () {
        return Transactions.findAll()
      }
    }
  })
})

module.exports = RootQuery
