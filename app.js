var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const cors = require('cors')
const { Server } = require('ws')

const wss = new Server({
  port: 3001
})

const msgQueue = [
  {
    time: Date.now(),
    name: '1',
    msg: 'haha',
    avatar:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
]
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('收到数据' + message)
    msgQueue.push(JSON.parse(message))
    ws.send(JSON.stringify(msgQueue), err => {
      if (err) {
        console.log(err)
      }
    })
  })
})

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
