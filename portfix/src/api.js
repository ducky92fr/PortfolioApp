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
export function createNewPortfolio (name) {
  return api.post('/addportfolio', { portfolioName: name }).then((response) => {
    return response.data
  })
}

// ======= Getting the User's Portfolios =======
export function getUserPortfolios () {
  return api.get('/user/portfolios').then((response) => {
    return response.data
  })
}
