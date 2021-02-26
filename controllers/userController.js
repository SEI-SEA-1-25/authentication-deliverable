const router = require('express').Router()
const db = require('../models')

/** NEW USERS **/
// GET ROUTE - /users/new
router.get('/new', (req, res) => {
    res.render("users/new")
})

// POST ROUTE - /users
router.post('/', async (req, res) => {
    try {
        const user = await db.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.cookie('userId', user.id)

        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})

/** LOGIN **/
// GET ROUTE to login page - /users/login
router.get('/login', (req, res) => {
    res.render("users/login")
})

// POST ROUTE - USER LOGIN PASSWORD 
router.post('/login', async (req, res) => {
    // res.send('you submitted a login form fam')

    // look up user who has the incoming email and check if it matches the incoming password
    const user = await db.user.findOne({
        where: { email: req.body.email }
    })
    // the cookie keeps them logged in
    // if yes, set the cookie userId = user.id
    if (user.password === req.body.password) {
        res.cookie('userId', user.id)
        res.redirect('/users/profile')
    } else {
        // if no, render the login form
        res.render('users/login')
    }
})

// PROFILE
router.get('/profile', (req, res) => {
    res.render("users/profile")
})

/** LOGOUT */
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router