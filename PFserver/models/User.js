const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  User model Schema. A user can have multiple
// portfolios.

const userSchema = new Schema({
  username: String,
  password: String,
  portfolios: [String]
})

const User = mongoose.model('User', userSchema)

module.exports = User
