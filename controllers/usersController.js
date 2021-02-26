const db = require('../models')
const router = require('express').Router()
const crtyptojs = require('crypto-js')

router.get('/new', (req, res) => {
  res.render('users/new')
})

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.get('/profile', (req, res) => {
  res.render('users/profile')
})

router.get('/logout', (req, res) => {
  res.clearCookie('userId')
  res.redirect('/')
})

router.post('/', async (req, res) => {
  try {
    const newUser = await db.users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.cookie('userId', newUser.id)

    
    res.redirect('/')
    } catch (error) {
      console.log(error);
    }
})

router.post('/login', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: {email: req.body.email}
    })
    if (user.password === req.body.password) {
      res.cookie('userId', user.id)
      res.redirect('/')
    } else {
      res.render('users/login')
    }
  } catch (error) {
    console.log(error);
  }
})





module.exports = router