const router = require('express').Router()
const models = require('../models')
const dotenv = require('dotenv')
const cryptoJs = require('crypto-js')

router.get('/new' , async (req, res) =>{
    res.render('user/new')
})

router.post('/', async (req, res) => {
    try{
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const encryptedUserId = cryptoJs.AES.encrypt(user.id.toString(), 'super secret string')
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }catch(err){
        console.log(err)
    }

})

router.get('/login', async (req, res) => {
    res.render('user/login')
})

router.post('/login', async (req, res) => {
    const user = await models.user.findOne({where:{
        email: req.body.email
        }
    })
    if(user.password === req.body.password){
        
        const encryptedUserId = cryptoJs.AES.encrypt(user.id.toString(), 'super secret string')
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
        console.log('you are at the homePage now')
    }else{
        console.log('it can not take you the page')
        res.render('user/login')
    }

})

router.get('/profile', (req, res) => {
    res.render('user/profile')
})

router.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})


module.exports = router