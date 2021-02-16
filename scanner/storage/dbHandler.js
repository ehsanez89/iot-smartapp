const mongoose = require('mongoose')
const { mongo } = require('mongoose')
const cSchema = require('.')
mongoose.Promise = global.Promise;


const dbHandler = () => {
    try{
    mongoose.connect('mongodb://localhost/Smartapp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

    .then(()=> console.log('Connected to mongodb...'))
    .catch(err => console.error('Error' , err))
 
    }
    catch (err){
        return err;
    }


const EmitList = mongoose.model('Emitters',cSchema)

async function createEmitter(id,timestamp){

    const emitResult = await Course.findById(id)
    if (emitResult) {
        emitResult._id = id
        emitResult.timestamp = timestamp
    
    const result = await emitResult.save()
    console.log(result)
    }
    else{
        const emitList = new EmitList({
            _id: id,
            timestamp: timestamp     
        })
       
       const result = await emitList.save()
       console.log(result)
    }

 
}

}
module.exports = dbHandler()