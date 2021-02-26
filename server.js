require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

const cryptojs = require('crypto-js')
// const bcrypt = require('bcrypt')


// const SECRET_STRING = process.env.SECRET_STRING
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

app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET_STRING)
        const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8)
    
        const user = await db.user.findByPk(decryptedUserIdString)
        res.locals.user = user


    } else {
        res.locals.user = null
    }
    next()
  })
  
app.use('/users', require('./controllers/usersControllers'))
  
  // routes
app.get('/', async (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
  })