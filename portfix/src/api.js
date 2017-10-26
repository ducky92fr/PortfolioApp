import axios from 'axios'

const auth = axios.create({
  baseURL: 'http://localhost:3000/auth'
})

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
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
  })
}

export function logIn (userInfo, vm) {
  return auth.post('/login', userInfo).then(response => {
    saveUserInfo(response.data)
    vm.user = response.data.user
    return response.data
  })
}

export function logout(vm) {
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
  })
}

// ======= Getting a single user Portfolio, given ID =======
export function getUserPortfolio (id) {
  return api.post('/user/portfolio', {portfolioID: id}).then((response) => {
    return response.data
  })
}

// ======= Adding a Stock to a Portfolio =======
export function addStockToPortfolio (data) {
  return api.post('/addstock', data).then((response) => {
    return response.data
  })
}

// ======= Selling a Stock from a Portfolio =======
export function sellStockFromPortfolio (data) {
  return api.post('/sellstock', data).then((response) => {
    return response.data
  })
}

// ======= Getting a Portfolio's Transactions, given ID =======
export function getPortfolioTransactions (portfolioID) {
  return api.post('/portfolio/transactions', { portfolioID }).then((response) => {
    return response.data
  })
}
