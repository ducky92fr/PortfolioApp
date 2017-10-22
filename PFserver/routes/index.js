var express = require('express')
var router = express.Router()

/* Testing */
router.get('/', function (req, res, next) {
  getLastPrices(['snap', 'fb', 'aapl']).then((data) => {
    res.json(data)
  })
})

module.exports = router

// IEX API
const axios = require('axios')

const IEX = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

// Get real-time price
// Last provides trade data for executions on IEX. It is a near real time,intraday API that provides IEX last sale price, size and time.
function getLastPrice (ticker) {
  let url = `/tops/last?symbols=${ticker}`
  return IEX.get(url).then(response => response.data)
}

function getLastPrices (tickers) {
  let url = `/tops/last/?symbols=${tickers[0]}`
  let length = tickers.length
  for (let i = 1; i < length; i++) {
    url += ',' + tickers[i]
  }
  return IEX.get(url).then(response => response.data)
}

// Todo:
//   - format time in json responses
//   - find other data to query
