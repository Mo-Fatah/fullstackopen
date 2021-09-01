const mongoose = require('mongoose');

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1);
}
const password = process.argv[2];
const inputName = process.argv[3];
const inputNumber = process.argv[4];
const uri = `mongodb+srv://fullstack:${password}@cluster0.ap3i5.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(err =>console.log(err));

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person' , personSchema);

const person = new Person({
    name: inputName,
    number: inputNumber
}) 
if( (inputName != undefined) && (inputNumber != undefined)){
    person.save().then(result =>{
        console.log(`added ${inputName} with number ${inputNumber} to phonebook`);
        mongoose.connection.close();
    }).catch(err => console.log(err));
}
else{
    Person.find({}).then(result =>{
        result.forEach(person =>{
            console.log(person.name + " " + person.number);
        })
        mongoose.connection.close();
    }).catch(err => console.log(err))
}