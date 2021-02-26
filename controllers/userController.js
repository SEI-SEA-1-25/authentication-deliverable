const router = require('express').Router()
const db = require('../models')
// const cryptojs = require('crypto-js')


router.get('/new', (req, res) => {
    res.render('users/new')
})

router.get('/profile', (req, res) => {
    res.render('users/profile')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.post('/', async (req, res) => {
    try{
        const user = await db.user.create({
        email: req.body.email,
        password: req.body.password
        })
        // const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), 'super secret string')
        // const encryptedUserIdString = encryptedUserId.toString()
        // res.cookie('userId', encryptedUserId.id)
        res.cookie("userId", user.id);
        res.redirect('/')
    } catch(err) {
        console.log(err)
    }
})


router.post('/login', async (req, res) => {
    //look up the user who has the incoming email
    const user = await db.user.findOne({
        where: { email: req.body.email}
    })
    //check if that user's password matches the incoming password
    if (user.password === req.body.password) {
        // const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), 'super secret string')
        // const encryptedUserIdString = encryptedUserId.toString()
        // res.cookie('userId', encryptedUserId.id)
        res.cookie("userId", user.id);
        res.redirect('/users/profile')
    } else {
        //if no, re-render the login form
        res.render('users/login')
    }
})




module.exports = router