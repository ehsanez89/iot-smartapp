const mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
    name: String,
    surename: String,
    email: String,
    password: String,
    beaconid: String,
    uid:{ type: Number, default: 100 }
})

module.exports = mongoose.model('schema_user', UserSchema,"schema_user");