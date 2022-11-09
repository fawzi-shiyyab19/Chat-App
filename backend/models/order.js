const mongoose = require('mongoose');

const order = mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('order', order);