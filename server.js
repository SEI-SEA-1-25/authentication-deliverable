const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const rowdyRes = rowdy.begin(app)

// Middleware
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('tiny'))
app.use(require('cookie-parser'))



const models = require('./models')


app.get('/', (req, res) => {
  console.log(req.cookies)
  res.render('index')
})

app.use('/users', require('./controllers/usersController'))

app.listen(3000, () => {
  console.log('server started!');
  rowdyRes.print()
})