const mongoose = require('mongoose');

const client_schema = new mongoose.Schema({
  beaconType: String,
  id: String,
  uuid:{
    type: String,
    unique : true
  },
  address: String,
  timestamp: Number
})

module.exports = mongoose.model('client_schema',client_schema);



