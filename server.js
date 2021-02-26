const express = require('express')
const rowdy = require('rowdy-logger')
const models = require('./models')
const ejsLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')


const app = express()
const PORT = 3000
const rowdyResult = rowdy.begin(app)

app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(ejsLayout)
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())

app.use(async (req, res, next) => {
    if(req.cookies.userId){

        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, 'super secret string')
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        
        const user = await models.user.findByPk(decryptedIdString)
        
        res.locals.user = user
    }else{
        res.locals.user = null
    }
    
    next()
    
})

app.get('/', async (req, res) => {
    res.render('index')
})

app.use('/user', require('./controller/userController'))


app.listen(PORT ,() => {
    console.log(`Server is listening ${PORT}`)
    rowdyResult.print()
})



