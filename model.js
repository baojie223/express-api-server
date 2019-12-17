const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/Auth', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set (val) {
      return bcrypt.hashSync(val, 10)
    }
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = { User }