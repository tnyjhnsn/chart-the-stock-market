require('dotenv').load()
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const socketEvents = require('./socket-events')
const middleware = require('./middleware')
const routes = require('./routes')
const mongoose = require('mongoose')

app.use(middleware)
app.use('/*', routes)

/* eslint-disable no-console */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection successful'))
  .catch(error => console.error(error))

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
})

socketEvents(io)
