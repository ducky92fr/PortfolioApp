var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

var index = require('./routes/index')

var app = express()

// db
mongoose.connect('mongodb://localhost/portfix', { useMongoClient: true })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

if (app.get('env') === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:8080'
    })
  )
}

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// Todo: Add error handler

module.exports = app
