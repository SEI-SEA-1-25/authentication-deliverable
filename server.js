//Dependencies 
require('dotenv').config()
const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const db = require('./models')
const rowdyRes = rowdy.begin(app)
const usersController = require('./controllers/usersController')
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')

//middleware
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(async (req, res, next) =>{
    
    if(req.cookies.userId) {
        
        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, process.env.COOKIE_SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        console.log(req.cookies.userId)
        console.log(decryptedId)
        console.log(decryptedIdString)
        const user = await db.user.findByPk(decryptedIdString)

        res.locals.user = user
    }else {
        res.locals.user = null
    }
    next()
})


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