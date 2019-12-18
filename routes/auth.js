const router = require('express').Router()
const { User } = require('../model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = 'token'

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.create({
      username,
      password
    })
    res.send(user)
  } catch (e) {
    res.status(500)
    res.send('账户已存在')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).exec()
  if (!user) {
    res.send('no such user')
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, SECRET)
      res.send({
        user,
        token
      })
    } else {
      res.send('password wrong')
    }
  }
})

router.get('/profile', async (req, res) => {
  try {
    const { id } = jwt.verify(req.headers.authorization.slice(7), SECRET)
    const user = await User.findById(id).exec()
    res.send(user)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
