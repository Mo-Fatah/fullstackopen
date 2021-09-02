const mongoose = require('mongoose');
const uniqueValidator = new require('mongoose-unique-validator');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true  })
.then(result=>{
    console.log('connected to MongoDb');
}).catch(err => console.log(err));

const personSchema = new mongoose.Schema({
    name: {
      type : String,
      required: true, 
      unique: true,
      minLength: 3
    },
    number: {
      type: String,
      required:true,
      minLength: 8
    }
})
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  module.exports= mongoose.model('Person' ,personSchema);

