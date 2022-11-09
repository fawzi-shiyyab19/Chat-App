'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

require('./config/db');

const{PORT} = require('./config/variables');
const orderRouter = require('./controllers/order');

const app = express();

app.use(cors());
app.use(express.json());

//Socket io
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT']
  }
})

io.on('connection', (socket) => {
  console.log('User is connected');
  
  socket.on('message', (message) => {
    console.log(`Message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  })
})

// require('./config/sockets');

// End of the Socket

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Order Route
const Order = require('./models/order');
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.send(error)
  }
})

app.post('/orders', async (req, res) => {
  try {
    const data = req.body;
    const order = new Order(data);
    await order.save();
    const orders = await Order.find();
    
    io.emit('order-added');
    
    res.status(201).json(order);
  } catch (error) {
    res.send(error)
  }
})

app.put('/orders/:id', async (req, res) => {
  const order = await Order.findOneAndUpdate({_id: req.params.id}, {$set: {customer: req.body.customer}},{returnOriginal: false});
  io.emit('order-added');
  res.status(202).json(order);
})
// End of the Order Route

// app.use('/orders', orderRouter)

module.exports = {app, io};

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})