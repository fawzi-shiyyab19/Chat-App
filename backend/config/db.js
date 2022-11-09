const mongoose = require('mongoose');
const {DB_URL} = require('./variables');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('DB up and Running')
})