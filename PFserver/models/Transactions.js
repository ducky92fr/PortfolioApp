const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Transaction model schema. Each transaction is associated to a 
// portfolio.

const transactionSchema = new Schema({
  date: Date,
  num: Number,
  prePortfolio: {
    stockTicker: String,
    number: Number
  },
  postPortfolio: {
    stockTicker: String,
    number: Number
  },
  change: {
    stockTicker: String,
    buy: Boolean, // true if the user buys more, false if the user sells
    buyPrice: Number,
    transactionPrice: Number
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
