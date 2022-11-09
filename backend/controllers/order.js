const router = require('express').Router();
const {io} = require('../index');
const Order = require('../models/order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.send(error)
  }
})

router.post('/', async (req, res) => {
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

module.exports = router;