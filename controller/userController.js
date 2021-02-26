const router = require('express').Router()
const db = require('../models')




router.get('/new', (req, res) => {
    res.render('users/new')
})



router.post('/', async (req, res) => {
    const user = await db.user.create({
        email: req.body.email,
        password: req.body.password
    })
    res.cookie('userId', user.id)
    res.redirect('/users/profile')

})


router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: { email: req.body.email}
    })
    if(user.password === req.body.password){
        res.cookie('userId', user.id)
        res.redirect('/users/profile')
    } else {
        res.render('users/login')
    }

})

router.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', async (req, res) => {
    console.log(res.locals.user)
   
    res.render('users/profile')
})


module.exports = router




