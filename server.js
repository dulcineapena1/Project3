const express = require('express')

const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const PORT = Number(process.env.PORT) || 5000
const PRODUCTION = process.env.NODE_ENV === 'production'
if (!PRODUCTION) {
  require('dotenv').config()
}

//log out the current configuration
console.log(`Our node env is: ${process.env.NODE_ENV}`)
console.log(
  `Found the mongo connection string to be: ${process.env.MONGODB_URI}`
)
console.log(`Running on port: ${process.env.PORT}`)

//Resuelve problema de debatirse entre el puerto 3000 para front y 3001 para apiroutes
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}
app.use(allowCrossDomain)

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}
// Add routes
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI)

// Start the API server
const server = app.listen(PORT, process.env.HOST || '::', () => {
  let host
  let port
  host = server.address().address
  port = server.address().port
  return console.log('listening on //%s:%s', host, port)
})
