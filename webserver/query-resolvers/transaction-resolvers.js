const { MerchantModel } = require('../data-models/Merchant')
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { packageModel } = require('./utils.js')

async function find(criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

//Need to finish this
async function findAll() {
  const query = TransactionModel.find()
    .then(transactions => {
      transactions.forEach(transaction => {
        UserModel.find()
      })
    })

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne(id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findAll,
  findOne
}
