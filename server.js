//Dependencies 
const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const db = require('./models')
const cookieParser = require('cookie-parser')
const rowdyRes = rowdy.begin(app)


//middleware
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
//app.use(cookieParser()) -- Will invoke this later when setting up cookies
//const cryptoJs = require('crypto-js)

//Home Route
app.get('/', (req, res) =>{
    res.render('index')
})





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("SERVIN UP SOME NODEMON BAAAABAYYYY!!!")
    rowdyRes.print()
})