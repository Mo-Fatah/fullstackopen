const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>{
    console.log('connected to MongoDb');
}).catch(err => console.log(err));


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports= mongoose.model('Person' ,personSchema);

