import axios from 'axios'

const auth = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export function signUp (userInfo) {
  return auth.post('/signup', userInfo).then(response => {
    return response.data
  })
}