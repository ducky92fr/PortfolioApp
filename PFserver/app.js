var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const config = require('./config')
const index = require('./routes/index')
const authRoutes = require('./routes/auth')
const User = require('./models/User')

var app = express()

// db
mongoose.connect('mongodb://localhost/portfix', { useMongoClient: true })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

if (app.get('env') === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:8080'
    })
  )
}

app.use(passport.initialize())
// Create the strategy for JWT
const strategy = new Strategy(
  {
    // this is a config we pass to the strategy
    // it needs to secret to decrypt the payload of the
    // token.
    secretOrKey: config.jwtSecret,
    // This options tells the strategy to extract the token
    // from the header of the request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    // payload is the object we encrypted at the route /api/token
    // We get the user id, make sure the user exist by looking it up
    User.findById(payload.id).then(user => {
      if (user) {
        // make the user accessible in req.user
        done(null, user)
      } else {
        done(new Error('User not found'))
      }
    })
  }
)
// tell pasport to use it
passport.use(strategy)

app.use('/auth', authRoutes)
app.use('/api', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// Todo: Add error handler

module.exports = app
