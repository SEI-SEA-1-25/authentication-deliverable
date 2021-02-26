//Dependencies 
const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const db = require('./models')
const rowdyRes = rowdy.begin(app)
const usersController = require('./controllers/usersController')
const cookieParser = require('cookie-parser')

//middleware
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(async (req, res, next) =>{
    const user = await db.user.findByPk(req.cookies.userId)
    res.locals.user = user
    next()
})

//const cryptoJs = require('crypto-js)

//controllers
app.use('/users', usersController)


//Home Route
app.get('/', async (req, res) =>{
    console.log(res.user)
    res.render('index')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("SERVIN UP SOME NODEMON BAAAABAYYYY!!!")
    rowdyRes.print()
})