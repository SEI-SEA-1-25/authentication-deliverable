require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const rowdy = require('rowdy-logger')
const rowdyRes = rowdy.begin(app)
const cryptoJS = require('crypto-js')
const cookieParser = require('cookie-parser')

// middleware
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('morgan')('tiny'))
app.use(express.static("public"))


app.use(async (req, res, next) =>{
    const user = await db.user.findByPk(req.cookies.userId)
    res.locals.user = user
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/users', require('./controllers/userController'))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})