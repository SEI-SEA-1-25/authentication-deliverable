// Required packages
require('dotenv').config
const express = require('express')
const app = express()
const models = require('./models')
const cryptoJS = require('crypto-js')
const rowdy = require('rowdy-logger')
const rowdyRes = rowdy.begin(app)


// Middleware
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser'))
app.use(require('morgan')('tiny'))


app.use(async(req, res, next) => {
        if (req.cookies.userId) {
            const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, ' ').toString(cryptoJS.enc.Utf8)
                // console.log(decryptedId)
            const user = await models.user.findOne({
                where: {
                    id: decryptedId
                }
            })
            res.locals.user = user
        } else {
            res.locals.user = null
        }

        next()
    })
    // Routes

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/users', require('./controllers/usersController'))

app.listen(3000, () => {
    console.log('hello from the server!');
    rowdyRes.print()
})