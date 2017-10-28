const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Stock model Schema. Not planning on keeping track of real-time prices here, not at first at least.
// More fundamental data and descriptions to be included though, for a potential stock screener.

const stockSchema = new Schema({
  ticker: String,
  companyName: String,
  sector: String,
  price: {
    latestPrice: String,
    latestUpdate: String
  },
  company: {
    CEO: String,
    description: String
  },
  stats: {
    marketcap: String,
    beta: String,
    week52high: String,
    week52low: String,
    week52change: String,
    dividendRate: String,
    dividendYield: String,
    latestEPS: String,
    latestEPSDate: String,
    returnOnEquity: String,
    EBITDA: String,
    revenue: String,
    grossProfit: String,
    cash: String,
    debt: String,
    revenuePerShare: String,
    returnOnAssets: String,
    profitMargin: String,
    priceToSales: String,
    priceToBook: String,
    day200MovingAvg: String,
    day50MovingAvg: String,
    institutionPercent: String,
    year5ChangePercent: String,
    year2ChangePercent: String,
    year1ChangePercent: String,
    ytdChangePercent: String,
    month6ChangePercent: String,
    month3ChangePercent: String,
    month1ChangePercent: String,
    day5ChangePercent: String
  },
  peers: [String]
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
