const router = require('express').Router()
const db = require('../models')
const AES = require('crypto-js')
const bcrypt = require('bcrypt')

// LOGIN ROUTES
router.get('/', async (req, res) =>{
    res.render('loginpage/login')
})

router.post('/', async (req, res) => {
    try {
        const checkEmail = await db.user.findOne({
            where: {
                email: req.body.email
        }})

        if (checkEmail != null && 
            checkEmail.dataValues.password === req.body.password) {
    
            res.render('loginpage/loginsuccess.ejs')
        } else {
            res.render('loginpage/loginfail.ejs')
        }
    } catch (err) {
        console.log();
    }
})

// router.get('/', async (req, res) => {

// })







module.exports = router
