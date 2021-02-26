const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(app)
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')

const models = require('./models')



app.use(express.urlencoded({ extended: false }))

app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())


app.use('/users', require('./controller/userController'))




app.use(async (req, res, next) => {

    const user = await models.user.findByPk(req.cookies.userId)

    res.locals.user = user
    console.log(user)

    next()

})


app.get('/', async (req, res, next) => {    
    res.render('index')
    
})




app.listen(3000, () => {
    console.log('server started!');
    rowdyResults.print()

})