const graphql = require('graphql')
const graphql_iso_date = require('graphql-iso-date')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { GraphQLDate } = graphql_iso_date
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        date: { type: GraphQLDate },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { amount, credit, date, debit, description, merchant_id, user_id }) {
        return (new TransactionModel({ amount, credit, date, debit, description, merchant_id, user_id })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id }) {
        return TransactionModel.findByIdAndDelete(id, err => {
          if (err) console.log(err)
          else console.log('Deleted', id)
        })
      }
    },
    editTransaction: {
      type: TransactionType,
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        date: { type: GraphQLDate },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { amount, credit, date, debit, description, id, merchant_id, user_id }) {
        return TransactionModel.findByIdAndUpdate(id, { amount: amount, credit: credit, date: date, debit: debit, description: description, merchant_id: merchant_id, user_id: user_id }, err => {
          if (err) console.log(err)
          else console.log('Updated', id)
        })
      }
    }
  }
})

module.exports = mutation
