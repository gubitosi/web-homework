let mongoose = require("mongoose");
let {
  Merchant: {MerchantModel},
  Transaction: {TransactionModel},
  User: {UserModel}, 
} = require("../data-models");

mongoose.connect('mongodb://localhost:27017/graphql', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const usersSeed = [
  {
    firstName: "John",
    lastName: "Smith",
    dob: "01/10/2000"
  },
  {
    firstName: "Jacob",
    lastName: "Montgomery",
    dob: "04/15/1990"
  },
  {
    firstName: "Luke",
    lastName: "Williams",
    dob: "09/21/2001"
  },
  {
    firstName: "Alexandria",
    lastName: "Garcia",
    dob: "08/19/1995"
  }
]

const merchantsSeed = [
    {
      name: "ShopSmart"
    },
    {
      name: "ShoeStore"
    },
    {
      name: "PayBuddy"
    },
    {
      name: "GrocersRUs"
    }
  ]

MerchantModel.deleteMany({})
  .then(() => TransactionModel.deleteMany({}))
  .then(() => UserModel.deleteMany({}))
  .then(() => UserModel.insertMany(usersSeed))
  .then(usersData => {
    console.log(usersData);
    MerchantModel.insertMany(merchantsSeed)
      .then(merchantsData => {
          console.log(merchantsData)
          const transactionsSeed = [
            {
              user_id: mongoose.Types.ObjectId(usersData[0]._id),
              amount: 100,
              credit: true,
              date: new Date(2019, 5, 10),
              debit: false,
              description: "Shopping Smart",
              merchant_id: mongoose.Types.ObjectId(merchantsData[0]._id)
            },
            {
              user_id: mongoose.Types.ObjectId(usersData[0]._id),
              amount: 50,
              credit: false,
              date: new Date(2019, 8, 4),
              debit: true,
              description: "Needed new shoes",
              merchant_id: mongoose.Types.ObjectId(merchantsData[1]._id)
            },
            {
              user_id: mongoose.Types.ObjectId(usersData[1]._id),
              amount: 1000,
              credit: false,
              date: new Date(2019, 12, 16),
              debit: true,
              description: "Paid a buddy",
              merchant_id: mongoose.Types.ObjectId(merchantsData[2]._id)
            },
          ];
          TransactionModel.insertMany(transactionsSeed)
          .then(transactionsData => {
              console.log(transactionsData);
              console.log(transactionsData[0].user_id instanceof mongoose.Types.ObjectId)
              process.exit(0);
          })
          .catch(err => {
            console.error(err);
            process.exit(1);
        })
      })
      .catch(err => {
          console.error(err);
          process.exit(1);
      })
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });