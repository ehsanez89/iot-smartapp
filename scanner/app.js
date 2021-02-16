//var mqtt = require('./mqtt-server');
//mqtt.connect();
const mqttClient = require("./mqtt-client");

var schedule = require("node-schedule");

const Noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
const client_schema = require('./schemas/client-schemas')
const mongoose = require("mongoose");
const StrictModeError = require("mongoose/lib/error/strict");
const { String } = require("mongoose/lib/schema/index");
isTrue = false
//mqttClient.connect()
try{
    mongoose.connect('mongodb://localhost/SmartApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

    .then(()=> console.log('Connected to mongodb...'))
    .catch(err => console.error('Error' , err))
 
    }
    catch (err){
        return err;
    }

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
const EmitList = mongoose.model('client_schema',client_schema.schema)

async function createEmitter(beaconType,uuid_,id_,address,timestamp){
    try{
    const emitResult = await EmitList.findOne({ uuid: uuid_ })
    if (emitResult) {
        emitResult.beaconType = beaconType
        emitResult.uuid = uuid_
        emitResult.id = id_
        emitResult.address = address
        emitResult.timestamp = timestamp
    
    const result = await emitResult.save()

    }
    else{
        const emitResult = new EmitList({
            beaconType: beaconType,
            uuid: uuid_,
            id: id_,           
            address: address,
            timestamp: timestamp,  
        })
        console.log('Scanner Added A New BID')

        mqttClient.subscribe(
      
          "/unige/" +
            process.env.FLOOR +
            "/" +
            process.env.ROOM  +
            "/" +
            uuid_ 
            
        );
      
       const result = await emitResult.save()
       
    }}
    catch(e){
        console.log(e)
    }

}

async function getAllData(current_time) {

    const filter = {}
    const result = await EmitList.find({"timestamp" : {
     
    $lt : current_time 
    }}  , function(err, users) {
    if (!err){

    users.forEach( function (user) {
      if (user.timestamp+3500 < current_time){
        var bid = user.toObject().uuid
        console.log('user removed')
        mqttClient.unsubscribe(
          "/unige/" +
            process.env.FLOOR +
            "/" +
            process.env.ROOM +
            "/" +
            bid 
        )
      user.remove();
    }});
    }})

}

async function deleteItems(id){
  const result = await Course.deleteOne({ _id : id})
  console.log("AAAA" , result)
}


var scanner = new BeaconScanner();

scanner.onadvertisement = (advertisement) => {
    var beacon = advertisement["iBeacon"];
    beacon.rssi = advertisement["rssi"];
    beacon.id = advertisement["uuid"];
    var bid = JSON.stringify(advertisement.iBeacon.uuid)
    var bTypeTemp= JSON.stringify( advertisement.beaconType)
    var bType= bTypeTemp.slice(1,-1)
    var idTemp= JSON.stringify( advertisement.id)
    var id= idTemp.slice(1,-1)
    var uuidtemp= JSON.stringify( advertisement.iBeacon.uuid)
    var uuid = uuidtemp.slice(1,-1);

    var addressTemp= JSON.stringify( advertisement.address)
    var address= addressTemp.slice(1,-1);
    if (advertisement.beaconType === "iBeacon") {

    createEmitter(bType,uuid,id,address,Date.now())  

   }
};

scanner.startScan().then(() => {
    console.log("Scanning for BLE devices...")  ;
}).catch((error) => {
    console.error(error);
});

var jj = schedule.scheduleJob('0-59/1 * * * * *', function(){
   const current_time = Date.now() - 1 * 2500;
   getAllData(current_time);

})