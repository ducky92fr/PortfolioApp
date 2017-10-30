const express = require('express')
const passport = require('passport')
const config = require('../config')
const router = express.Router()

const User = require('../models/User')
const Portfolio = require('../models/Portfolio')
const Transaction = require('../models/Transaction')
const Stock = require('../models/Stock')

// ======= Creating a new Portfolio =======
router.post('/addportfolio', passport.authenticate('jwt', config.jwtSession), (req, res, nex) => {
  let userID = req.user._id
  let portfolioName = req.body.portfolioName
  let cash = req.body.cash
  let newPortfolio = new Portfolio({
    userID: userID,
    name: portfolioName,
    current: {
      date: Date.now(),
      stocks: {
        PFAPPCASH: cash
      },
      BEPs: {
        PFAPPCASH: 1
      }
    },
    history: []
  })
  newPortfolio.save((error, portfolio) => {
    if (error) {
      res.json({
        errorMessage: "Something went wrong, couldn't save new Portfolio"
      })
    } else {
      let portfolioID = portfolio._id
      User.findByIdAndUpdate(userID, {
        $push: {
          portfolios: portfolioID
        }
      }, () => {
        res.json({
          success: true,
          errorMessage: false
        })
      })
    }
  })
})

// ======= Adding a Stock to a Portfolio =======
router.post('/addstock', passport.authenticate('jwt', config.jwtSession), (req, res, nex) => {
  let userID = req.user._id
  let portfolioID = req.body.portfolioID
  let date = req.body.date
  let ticker = req.body.ticker
  let quantity = req.body.quantity
  let price = req.body.price

  // check if useriD = PF ID, then update PF, then create transaction
  Portfolio.findById(portfolioID).then(portfolio => {
    // Checking that the PF belongs to the user requesting the info
    if (userID.equals(portfolio.userID)) {
      // Current portfolio becomes old portfolio
      let oldPortfolio = Object.assign({}, portfolio.current)
      let oldStockNum = oldPortfolio.stocks[ticker] || 0
      let oldStockBEP = oldPortfolio.BEPs[ticker] || 0
      let newStockNum = parseInt(oldStockNum, 10) + parseInt(quantity, 10)

      // Creating new transaction
      let newTransaction = new Transaction({
        date,
        userID,
        portfolioID,
        affectedStocks: [{
          ticker,
          preNum: oldStockNum,
          change: quantity,
          atPrice: price,
          postNum: newStockNum
        }]
      })
      // Saving the new transaction to our DB
      newTransaction.save((error) => {
        if (error) {
          console.log(error)
          res.json({
            errorMessage: "Something went wrong, couldn't save new Portfolio"
          })
        } else {
          // Updating the portfolio object
          portfolio.history.push(oldPortfolio)
          portfolio.date = date
          portfolio.current.stocks[ticker] = newStockNum
          portfolio.current.BEPs[ticker] = (price * quantity + oldStockBEP * oldStockNum) / (newStockNum)

          portfolio.markModified('current')
          portfolio.save((error) => {
            if (error) {
              res.json({
                errorMessage: "Something went wrong, couldn't save new Portfolio"
              })
            } else {
              res.json({
                success: true,
                errorMessage: false
              })
            }
          })
        }
      })
    } else {
      res.json({errorMessage: 'unauthorized'})
    }
  }).catch((error) => {
    console.error('ERROR ADDING STOCK, ', error)
  })
})

// ======= Selling a Stock from a Portfolio =======
router.post('/sellstock', passport.authenticate('jwt', config.jwtSession), (req, res, nex) => {
  let userID = req.user._id
  let portfolioID = req.body.portfolioID
  let date = req.body.date
  let ticker = req.body.ticker
  let quantity = req.body.quantity
  let price = req.body.price

  // check if useriD = PF ID, then update PF, then create transaction
  Portfolio.findById(portfolioID).then(portfolio => {
    // Checking that the PF belongs to the user requesting the info
    if (userID.equals(portfolio.userID)) {
      // Current portfolio becomes old portfolio
      let oldPortfolio = Object.assign({}, portfolio.current)
      let oldStockNum = oldPortfolio.stocks[ticker] || 0
      let newStockNum = parseInt(oldStockNum, 10) - parseInt(quantity, 10)

      if (parseInt(oldStockNum, 10) < parseInt(quantity, 10)) {
        res.json({
          errorMessage: 'Something went wrong - You seem to be trying to sell more stocks than you have in your Portfolio'
        })
        return undefined
      }

      // Creating new transaction
      let newTransaction = new Transaction({
        date,
        userID,
        portfolioID,
        affectedStocks: [{
          ticker,
          preNum: oldStockNum,
          change: quantity,
          atPrice: price,
          postNum: newStockNum
        }]
      })
      newTransaction.save((error) => {
        if (error) {
          console.log(error)
          res.json({
            errorMessage: "Something went wrong, couldn't save new Portfolio"
          })
        } else {
          portfolio.history.push(oldPortfolio)
          portfolio.date = date
          if (newStockNum > 0) {
            portfolio.current.stocks[ticker] = newStockNum
          } else {
            delete portfolio.current.stocks[ticker]
          }

          portfolio.markModified('current')
          portfolio.save((error) => {
            if (error) {
              res.json({
                errorMessage: "Something went wrong, couldn't save new Portfolio"
              })
            } else {
              res.json({
                success: true,
                errorMessage: false
              })
            }
          })
        }
      })
    } else {
      res.json({errorMessage: 'unauthorized'})
    }
  }).catch((error) => {
    console.error('ERROR SELLING STOCK, ', error)
  })
})

// ======= Getting a Portfolio's Transactions, given ID =======
router.post('/portfolio/transactions', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  let userID = req.user._id
  let portfolioID = req.body.portfolioID

  Transaction.find({portfolioID, userID}).then(transactions => {
    res.json(transactions)
  }).catch((error) => {
    console.error('ERROR GETTING TRANSACTIONS, ', error)
  })
})

// ======= Getting the User's Portfolios =======
router.get('/user/portfolios', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  let userID = req.user._id
  Portfolio.find({userID}).then(portfolios => {
    res.json(portfolios)
  }).catch((error) => {
    console.error('ERROR GETTING PORTFOLIOS, ', error)
  })
})

// ======= Getting a single Portfolio, given ID =======
router.post('/user/portfolio', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  let userID = req.user._id
  let portfolioID = req.body.portfolioID

  Portfolio.findById(portfolioID).then(portfolio => {
    // Checking that the PF belongs to the user requesting the info
    if (userID.equals(portfolio.userID)) {
      res.json(portfolio)
    } else {
      res.json({errorMessage: 'unauthorized'})
    }
  }).catch((error) => {
    console.error('ERROR GETTING PORTFOLIO, ', error)
  })
})

/* Testing */
router.get('/', function (req, res, next) {
  getLastPrices(['snap', 'fb', 'aapl']).then((data) => {
    console.log('DATA', data)
    res.json(data)
  }).catch((error) => {
    console.error('ERROR GETTING TRANSACTIONS, ', error)
  })
})

router.get('/getall', (req, res, next) => {
  getAllListedStocksOnIEX().then((data) => {
    res.json(data)
  }).catch((error) => {
    console.error('ERROR FETCHING ALL LISTED STOCKS, ', error)
  })
})

module.exports = router

// IEX API
const axios = require('axios')

// Testing axios post for signup
axios.post('http://localhost:3000/signup', {
  name: 'name',
  username: 'woo',
  password: 'yes'
})

// IEX base url
const IEX = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

// IEX Fetching
router.get('/IEXfetch/*', (req, res, next) => {
  let url = req.originalUrl
  url = url.slice(13) // getting the original request
  return IEX.get(url).then(response => {
    res.json(response.data)
  }).catch((error) => {
    console.error('ERROR FETCHING IEX REQUEST, ', error)
  })
})

// Getting basic Stock financial info from IEX
router.get('/getfinancials', (req, res, next) => {
  let url = '/stock/market/batch?symbols=aapl,fb,aig,gs,googl&types=quote,company,stats,peers,financials'

  return IEX.get(url).then(response => {
    res.json(response.data)
  }).catch((error) => {
    console.error('ERROR FETCHING FINANCIALS, ', error)
  })
})

// Getting Stock data from database
router.get('/stock/:ticker', (req, res, next) => {
  let ticker = req.params.ticker.toUpperCase()

  Stock.findOne({ticker})
       .then(stock => {
         res.json(stock)
       })
      .catch((error) => {
        console.error('ERROR FETCHING FINANCIALS, ', error)
      })
})

// Get real-time price
// Last provides trade data for executions on IEX. It is a near real time,intraday API that provides IEX last sale price, size and time.
function getLastPrices (tickers) {
  let url = `/tops/last/?symbols=${tickers[0]}`
  let length = tickers.length
  for (let i = 1; i < length; i++) {
    url += ',' + tickers[i]
  }
  return IEX.get(url).then(response => response.data).catch((error) => {
    console.error('ERROR FETCHING LAST PRICES, ', error)
  })
}

// Screener functions testing

//  Returns a list of all stocks listed on IEX
// exchange
function getAllListedStocksOnIEX () {
  let url = '/ref-data/symbols'
  return IEX.get(url).then(response => {
    return {
      length: response.data.length,
      tickerList: response.data
    }
  }).catch((error) => {
    console.error('ERROR FETCHING ALL LISTED STOCKS, ', error)
  })
}

// Todo:
//   - find other data to query
