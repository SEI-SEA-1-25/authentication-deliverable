const router = require('express').Router()
const db = require('../models')



//GET routes stubbed here//

// router.get('/', async (req, res) =>{
    
// })

router.get('/new',(req, res) => {
    res.render('users/new')
})

router.get('/login',(req, res) => {
    res.render('users/login')
})

router.get('/logout',(req, res) => {
    res.redirect('/')
})

//POST Routes Stubbed Here



module.exports = router