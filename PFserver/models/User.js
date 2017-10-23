const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

//  User model Schema. A user can have multiple
// portfolios.

const userSchema = new Schema({
  name: String,
  portfolios: [String]
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User
