const jwt = require('jsonwebtoken')

const SECRET = 'token'

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, SECRET)
    // const user = await User.findById(id).exec()
    next()
  } catch (e) {
    res.status = 401
    res.send(e)
  }
}

module.exports = { auth }