const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const cookieParser = require('cookie-parser')
const db = require('./models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const ejsLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
require('dotenv').config()

//  middleware
const rowdyRes = rowdy.begin(app)
const PORT = 3000
app.use(express.static('public'))
app.use(cookieParser())
app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(async (req, res, next) =>{
  const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, 'super secret string')
  const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8)
    const user = await db.users.findByPk(decryptedUserIdString)
    res.locals.user = user
    next()
  })

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/users', require('./controllers/usersController'))

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}}`);
  rowdyRes.print()
})