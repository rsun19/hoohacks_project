const { createServer } = require('http')
const { Server } = require('socket.io')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const port = process.env.PORT || 3000

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    return nextHandler(req, res)
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id)

    socket.on('joinLobby', () => {
      console.log(`${socket.id} joined the lobby`)
      io.emit('lobbyUpdate', { user: socket.id, action: 'joined' })
    })

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id)
      io.emit('lobbyUpdate', { user: socket.id, action: 'left' })
    })
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
