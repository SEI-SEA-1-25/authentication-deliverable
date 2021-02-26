const { render } = require('ejs')
const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const cookieParser = require('cookie-parser')
const db = require('./models/index.js')

// middleware
const rowdyRes = rowdy.begin(app)
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) // tells it to grab from public folder
app.use(cookieParser())

app.use(async (req, res, next) => {
    const user = await db.user.findByPk(req.cookies.userId)

    res.locals.user = user

    next()
})

// routes
app.get('/', async (req, res) => {
    // not sending res.user in here
    // it was set upstream

    // console.log(user)
    res.render('index')
})



// controllers
app.use('/users', require('./controllers/userController.js'))

// starts the sever!
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
})