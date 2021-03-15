
const router = require('express').Router()
const models = require('../models')


router.get('/new', (req, res) => {
  res.render('users/new')
})


router.post('/', async (req, res) => {
  const user = await models.user.create({
    email: req.body.email,
    password: req.body.password
  })
  res.redirect('/')
})


router.get('/login', (req, res)  => {
  res.render('users/login')
})

router.post('/login', async (req, res) => {
  const user = await models.user.findOne({
    where: {
      email: req.body.email
    }
  })

  if (user.password === req.body.password) {
    res.cookie('userId', user.id)
    res.redirect('/')
  } else {
    res.render('users/login')
  }
})


router.get('/logout', (req, res) => {
  res.redirect('/')
})

router.get('/profile', async (req, res) => {



  res.render('users/profile')  
})

module.exports = router