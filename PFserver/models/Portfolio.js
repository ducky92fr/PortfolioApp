const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Portfolio model Schema. The cash portion of the portfolio
// will be saved in startingPortfolio, currentPortfolio, and transactions
// as a stock, ie: {stockTicker: PFAPPCASH (not a real ticker and unlikely to become one),
// number, and an unchanging price of 1}.

// stocks will follow the format {ticker: num}

const portfolioSchema = new Schema({
  userID: String,
  name: String,
  current: {
    date: Date,
    stocks: Object,
    BEPs: Object
  },
  history: [{
    date: Date,
    stocks: Object
  }]
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio
