import axios from 'axios'

const auth = axios.create({
  baseURL: 'http://localhost:3000/auth'
})

export function signUp (userInfo) {
  return auth.post('/signup', userInfo).then(response => {
    return response.data
  })
}

export function logIn (userInfo) {
  return auth.post('/login', userInfo).then(response => {
    return response.data
  })
}
