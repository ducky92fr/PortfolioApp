const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Transaction model schema. Each transaction is associated to a 
// portfolio.

const transactionSchema = new Schema({
  date: Date,
  userID: String,
  portfolioID: String,
  affectedStocks: [{
    ticker: String,
    preNum: Number,
    change: Number,
    atPrice: Number,
    postNum: Number
  }]
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
