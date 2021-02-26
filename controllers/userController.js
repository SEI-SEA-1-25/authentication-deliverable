const router = require('express').Router()
const db = require('../models')
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')



router.post('/', async (req, res) => {
    try {

        //This is the step to encrypte user id
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const newUser = await db.user.create({
            email: req.body.email,
            password: hashedPassword
        })

        const encryptedId = AES.encrypt(newUser.id.toString(), 'asdfasdf').toString()
        res.cookie('userId', encryptedId)





        res.render('welcome/user.ejs')
    } catch (err) {
        console.log(err);
    }
})





// LOGIN ROUTES
router.get('/')



module.exports = router