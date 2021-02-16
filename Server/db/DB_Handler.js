/**
 * this class used to store data
 * currently our class use mongo db in order to save data
 * you can use your own
 * @type {{Get: Get}}
 */
const dbs = require('./connection/DatabaseHandler')
const ScannerSchema = require('./schema/scanner');
const ClientSchema = require('./schema/client');
const PersonSchema = require('./schema/user');
const NodeCache = require( "node-cache" );

let db
const myCache = new NodeCache();
const scannerCache = new NodeCache();

class DB_Handler{
    //Client Region
    resetAll(){
        console.log('resetAll');
        let newvalues = { $set: {isConnected: 0} };
        db.collection("schema_client").updateMany({},newvalues,(err,res)=>{

        })
    }

    resetSensor(floor,room){

        console.log('resetSensor : ', floor, " ",room);
        let newvalues = { $set: {isConnected: 0} };
        db.collection("schema_client").updateMany({floor:floor,room:room},newvalues,(err,res)=>{})
    }

    resetClient(floor,room,clientId,time,delegate){
        db.collection("schema_user").findOne({beaconid:clientId},(err,res) => {
            if(res){
            db.collection("schema_client").findOne({clientId: clientId,floor:floor,room:room},{ sort: { 'created_at' : -1 } },function (err, result) {
                console.log("resetClient")
                if (err!=null){
                    console.log("insert clint ERROR : ",err)
                }else{
                    let newvalues = { $set: {isConnected: 0,timestamp_out:time} };
                    console.log("resetClient finded")
                    db.collection("schema_client").updateMany({clientId: clientId},newvalues,(err,result)=>{
                        if (result==null){
                            console.log("resetClient update")
                        }
                        delegate()
                    })
                }
            })
            }
        })
        
    }

    addClient(floor,room,clientId,time,delegate){

        db.collection("schema_user").findOne({beaconid:clientId},function(err,res){
            if(err){
                console.log(err)
            }
            console.log("can res > ",res)    
            if(res){
                let data = new ClientSchema({
                    clientId: clientId,
                    isConnected: 1,
                    floor: floor,
                    timestamp_in:time,
                    room: room,
                    user:res._id
                })    
              
                db.collection("schema_client").insertOne(data,(error,result)=>{
                    if (error!=null){
                        console.log(error)
                    }else{
                        if (myCache.get(floor+"/"+room)){
                            let array=myCache.get(floor+"/"+room)
                            array.push(data)
                            myCache.set(floor+"/"+room,array)
                        }else{
                            let array = []
                            array.push(data)
                            myCache.set(floor+"/"+room,array)
                        }
                        delegate()
                    }
                });
            }else{
                console.log("Problem in find the client")
            }
        })
        
    }


    clientInRoom(floor,room,delegate){
        console.log(floor,' , ',room)
        let mode = new ClientSchema()
        ClientSchema.find({floor:floor,room:room,isConnected:1}).populate("user").exec(function (err,res){
            console.log(res)
            delegate(err,res)
        })
    }

    addUser(person,delegate){
        this.guid((err,res)=>{
            let data = new PersonSchema({
                name:person.name,
                surename:person.surename,
                email:person.email,
                password:person.password,
                beaconid:person.beaconid,
                uid:res
            })    
            db.collection("schema_user").findOne({$or:[{beaconid:person.beaconid},{email:person.email}]},function(err,res){
                if(!res){
                    db.collection("schema_user").insertOne(data,(err,res)=>{
                        delegate(err,res)
                    })
                }
            })    
        })
    }


    allStaff(delegate){
        console.log('allStaff')
        db.collection("schema_user").find({}).toArray(function (err,res){
            console.log(res)
            delegate(err,res)
        })
        
    }

    userByUUID(beaconid,delegate){
        console.log("getuser by token ",beaconid)
        db.collection("schema_user").findOne({beaconid:beaconid},(err,res)=>{
            delegate(err,res)
        })
    }

    turnOffScanner(floor,room){
        db.collection("schema_scanner").findOne({floor:floor,room:room}, (err, result) => {
            if (result === null) {
                console.log("scanner cant find - turnoff")

            } else {
                console.log("scanner find - turnoff")
                let newvalues = { $set: {isConnected: 0} };
                db.collection("schema_scanner").updateOne({floor:floor,room:room},newvalues,(error,result)=>{
                    console.log("scanner update - turnoff")
                    if (scannerCache.get(floor+"/"+room)) {
                        let array = scannerCache.get(floor + "/" + room)
                        array.push(result)
                        scannerCache.set(floor + "/" + room, array)
                    }else{
                        let array = []
                        array.push(result)
                        scannerCache.set(floor + "/" + room, array)
                    }
                });
            }
        });

    }

    addScanner(name,floor,room,capacity,sensorid,delegate){
        let data = new ScannerSchema({
            isConnected: 1,
            floor: floor,
            room: room,
            name: name,
            capacity:capacity,
            sensorid:sensorid
        })
        db.collection("schema_scanner").findOne({sensorid:sensorid}, function(err, result){
            if (result === null) {
                console.log("cant find - addScanner")
                db.collection("schema_scanner").insertOne(data,(err,res)=>{
                    if (scannerCache.get(floor+"/"+room)) {
                        let array=scannerCache.get(floor+"/"+room)
                        array.push(data)
                        scannerCache.set(floor + "/" + room, array)
                    }else{
                        let array=[]
                        array.push(data)
                        scannerCache.set(floor + "/" + room, array)
                    }
                    delegate(err,res)
                })
            } else {
                console.log("scanner find - addScanner")
                let new_values = { $set: {name:name,floor:floor,room:room,isConnected: 1} };
                db.collection("schema_scanner").updateOne({sensorid:sensorid},new_values,(error,result)=>{
                    console.log("scanner update - addScanner")
                    if (scannerCache.get(floor+"/"+room)) {
                        let array=scannerCache.get(floor+"/"+room)
                        array.push(data)
                        scannerCache.set(floor + "/" + room, array)
                    }else{
                        let array=[]
                        array.push(data)
                        scannerCache.set(floor + "/" + room, array)
                    }
                });
            }
        });
      
    }

    getAllScanners(delegate){
        db.collection("schema_scanner").find({}).toArray(function(err,res){
            delegate(err,res)
        })

    }

    getScanner(floor,room,delegate){
        db.collection("schema_scanner").findOne({floor:floor,room:room},(err,res)=>{
            delegate(err,res)
        })
    }

    login(email,pass,delegate){
        db.collection("schema_user").findOne({email:email,password:pass},(err,res)=>{
            delegate(err,res)
        })
    }


    countClientinRoom(floor,room,delegate){
        console.log(floor,' , ',room)

        db.collection("schema_client").find({floor:floor,room:room,isConnected:1}).toArray(function (err,res){
            console.log(res.length)
            delegate(err,res.length)
        })
    }

    guid(delegate){
        let mode = new PersonSchema()
        PersonSchema.find({}).sort({"uid":-1}).limit(1).exec((err,res)=>{
            console.log
            if(err===null){
                if(res.length>0){
                    const newUid=res[0].uid+1
                    delegate(null,newUid)
                }else{
                    delegate(null,101)
                }
            }else{
                delegate(null,101)
            }
        })
    }

    

    init(){
        db = dbs.Get();
    }
}

module.exports = DB_Handler