import axios from 'axios'

const auth = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/auth' : 'http://localhost:3000/auth'
})

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api'
})

const IEXproxy = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api/IEXfetch' : 'http://localhost:3000/api/IEXfetch'
})

const IEX = axios.create({
  baseURL: 'https://api.iextrading.com/1.0',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }
})

function saveUserInfo ({token, user}) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function checkUser (vm) {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('user')
  if (token && userInfo) {
    const user = JSON.parse(userInfo)
    saveUserInfo({
      token,
      user
    })
    vm.user = user
  }
}

export function signUp (userInfo) {
  return auth.post('/signup', userInfo).then(response => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

export function logIn (userInfo, vm) {
  return auth.post('/login', userInfo).then(response => {
    saveUserInfo(response.data)
    vm.user = response.data.user
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

export function logout (vm) {
  localStorage.removeItem('token')
  vm.user = null
  delete axios.defaults.headers.common['Authorization']
}

// ======= Creating a new Portfolio =======
export function createNewPortfolio (args) {
  return api.post('/addportfolio', { portfolioName: args.name, cash: args.cash }).then((response) => {
    return response.data
  })
}

// ======= Getting the User's Portfolios =======
export function getUserPortfolios () {
  return api.get('/user/portfolios').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Getting a single user Portfolio, given ID =======
export function getUserPortfolio (id) {
  return api.post('/user/portfolio', {portfolioID: id}).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Adding a Stock to a Portfolio =======
export function addStockToPortfolio (data) {
  return api.post('/addstock', data).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Selling a Stock from a Portfolio =======
export function sellStockFromPortfolio (data) {
  return api.post('/sellstock', data).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Getting a Portfolio's Transactions, given ID =======
export function getPortfolioTransactions (portfolioID) {
  return api.post('/portfolio/transactions', { portfolioID }).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// https://api.iextrading.com/1.0/tops/last?symbols=SNAP,fb,AIG
// ======= Getting last IEX prices for given Stocks =======
export function getLastIEXPrice (stocks) {
  return IEX.get('/tops/last?symbols=SNAP,fb,AIG').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Getting all stocks listed on IEX =======
export function getAllListedStocksOnIEX () {
  return api.get('/getall').then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Sending requests to IEX via our API =======
// only pass the part AFTER iextrading.com/1.0/
function proxyFetchFromIEX (url) {
  return IEXproxy.get(url).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error)
  })
}

// ======= Getting the last sale price on IEX for given stocks =======
export function getLastPriceFromIEX (stocksArray) {
  let url = '/tops/last?symbols=' + stocksArray.join()
  return proxyFetchFromIEX(url)
}
