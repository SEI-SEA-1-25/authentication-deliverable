const router = require('express').Router()
const cryptojs = require('crypto-js')
const db = require('../models')
// const SECRET_STRING = process.env.SECRET_STRING

router.get('/new', (req, res) => {
    res.render('users/new')
})

router.get('/profile', (req, res) => {
    res.render('users/profile')
})


router.post('/', async (req, res)=> {
    const newUser = await db.user.create({
        email: req.body.email,
        password: req.body.password
    })
    const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET_STRING)
    // console.log(process.env.SECRET_STRING)
    const encryptedUserIdString = encryptedUserId.toString()
    res.cookie('userId', encryptedUserIdString)

    // res.cookie('userId', newUser.id)
    res.redirect('/users/profile')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: { email: req.body.email}
    })
    if (user.password === req.body.password) {
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET_STRING)
        const encryptedUserIdString = encryptedUserId.toString()
    
        res.cookie('userId', encryptedUserIdString)
        // res.cookie('userId', user.id)
        res.redirect('/users/profile')
    } else {
        res.render('users/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})
module.exports = router