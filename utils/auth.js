const jwt = require('jsonwebtoken')

const SECRET = 'token'

const auth = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.slice(7)
    const { id } = jwt.verify(token, SECRET)
    // const user = await User.findById(id).exec()
    console.log(id)
    next(id)
  } catch (e) {
    console.log(e)
    res.status(401)
    res.send(e)
  }
}

module.exports = { auth }