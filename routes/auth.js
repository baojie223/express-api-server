const router = require('express').Router()
const { User } = require('../model')

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const doc = await User.create({
    username,
    password
  })
  res.send(doc)
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  res.send(User.find())
})

module.exports = router