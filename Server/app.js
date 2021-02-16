const mqtt = require('./mqtt_server')
const login = require('./admin/login')
const express = require('express')
const DB_Handler = require('./db/DB_Handler')
const bodyParser = require('body-parser');
const app = express();
let cors = require('cors');
const PersonSchema = require('./db/schema/user');

require('dotenv/config');

// Init Storage
let storage =new DB_Handler()
storage.init()
//cleanup connected status
storage.resetAll()

//init admin
let data = new PersonSchema({
    name:'admin',
    surename:'admin',
    email:'admin@smartapp.com',
    password:'admin',
    beaconid:'root',
    uid:100
})

storage.addUser(data,() => {
    
})

app.use(cors());

app.use('/login', login);

app.listen(1080);

mqtt.connection()


