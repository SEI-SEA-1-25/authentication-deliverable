const router = require('express').Router()
const db = require('../models')
const cryptoJs = require('crypto-js')
const bcrypt = require('bcryptjs')



//GET routes stubbed here//

router.get('/profile', async (req, res) =>{
    res.render('users/profile')
})

router.get('/new',(req, res) => {
    res.render('users/new')
})

router.get('/login',(req, res) => {
    res.render('users/login')
})

router.get('/logout',(req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

//POST Routes Stubbed Here

router.post('/new', async (req, res) =>{
    try{
        const plainPassword = req.body.password
        const hashedPassword = bcrypt.hashSync(plainPassword, 12)

        console.log(hashedPassword)

        const newUser = await db.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedUserId = cryptoJs.AES.encrypt(newUser.id.toString(), process.env.COOKIE_SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')

    }catch(err){
     console.log(err)
    }
}) 

router.post('/login', async (req, res) => {

   const member = await db.user.findOne({
    where: {email: req.body.email}
   })
   if(member.password === req.body.password) {
    //   if(bcrypt.compare)
       const encryptedUserId = cryptoJs.AES.encrypt(member.id.toString(), process.env.COOKIE_SECRET)
       const encryptedUserIdString = encryptedUserId.toString()
       res.cookie('userId', encryptedUserIdString)
       res.redirect('/users/profile')
   }else {
       res.render('users/login')
   }

})



module.exports = router