const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Portfolio model Schema. The cash portion of the portfolio
// will be saved in startingPortfolio, currentPortfolio, and transactions
// as a stock, ie: {stockTicker: PFAPPCASH (not a real ticker and unlikely to become one),
// number, and an unchanging price of 1}.

const portfolioSchema = new Schema({
  userID: String,
  name: String,
  value: Number,
  startingPortfolio: [{
    stockTicker: String,
    number: Number,
    buyPrice: Number
  }],
  currentPortfolio: [{
    stockTicker: String,
    number: Number,
    buyPrice: Number,
    breakevenPrice: Number
  }],
  transactions: [[{
    date: Date,
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
  }]]
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio
