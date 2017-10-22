const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  Stock model Schema. Not planning on keeping track of real-time prices here, not at first at least.
// More fundamental data and descriptions to be included though, for a potential stock screener.

const stockSchema = new Schema({
  ticker: String
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
