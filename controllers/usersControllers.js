const router = require('express').Router()
// const cryptojs = require('crypto-js')
const db = require('../models')

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
    res.cookie('userId', newUser.id)
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: { email: req.body.email}
    })
    if (user.password === req.body.password) {
        res.cookie('userId', user.id)
        res.redirect('/')
    } else {
        res.render('users/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})
module.exports = router