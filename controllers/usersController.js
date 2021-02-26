const router = require('express').Router()
const db = require('../models')



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
        const newUser = await db.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log("this is the console " + newUser.name)
        res.cookie('userId', newUser.id)
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
       res.cookie('userId', member.id)
       res.redirect('/users/profile')
   }else {
       res.render('users/login')
   }

})



module.exports = router