const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const msgQueue = [
  {
    time: Date.now(),
    name: 'test',
    data: 'haha',
    avatar:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
]

io.on('connection', socket => {
  console.log('connected')
  io.emit('update', msgQueue)

  socket.on('update', msg => {
    msgQueue.push(msg)
    io.emit('update', msgQueue)
  })

  socket.on('enter', name => {
    io.emit('someone enter', name)
  })
  socket.on('leave', name => {
    io.emit('someone leave', name)
  })
  
  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})

server.listen(3000, () => {
  console.log('\n\x1b[42m\x1b[30m %s \x1b[0m\x1b[32m %s \x1b[0m\n', 'DONE', 'Server is running at port 3000')
})