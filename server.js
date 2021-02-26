require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')

const app = express()
const PORT = process.env.PORT || 3000

// middleware
const rowdyRes = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(require('morgan')('tiny'))
app.use(cookieParser())

app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
  })