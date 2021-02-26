require('dotenv').config()
const db = require('./models')

const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const rowdyResult = rowdy.begin(app)
const cryptoJS = require('crypto-js')

//middleware
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser')())
app.use(require('morgan')('tiny'))
app.use(express.static('public'))

/*-------------This is the steps to decrypt user id------------------*/
app.use(async (req, res, next) => {  
    if (req.cookies.userId) {
      const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, 'asdfasdf').toString(cryptoJS.enc.Utf8)
  
      console.log(decryptedId);
      
      const newUser = await db.user.findOne({
        where: {
          id: decryptedId
        }
      })
  
      res.locals.user = newUser
    } else {
      res.locals.user = null
    }
  
    next()
  })
/*-----------------------------------------------------------------*/


app.get('/', async (req, res) => {
    res.render('index')
})


app.use('/users', require('./controllers/userController'))
app.use('/login', require('./controllers/loginController'))
app.use('/profile', require('./controllers/profileController'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('SERVER STARTED');
    rowdyResult.print()
})