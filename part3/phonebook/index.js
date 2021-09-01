require('dotenv').config();
const express = require('express');
const app = express() ;
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'))
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
morgan.token('customized', (req , resp) =>{
    return JSON.stringify(req.body);
})


app.get('/', (request, response) =>{
    response.send("<h1>HelloWorld</h1>")
})

app.get('/api/persons' , (request , response ,next) =>{
    console.log('routed in get ');
    Person.find({}).then(persons =>{
        
        response.json(persons);
    }).catch(err => next(err))
})

app.get('/info' , (request , response) =>{
    const date = new Date();
    response.send(`<h4>PhoneBook has info for </h4>`
    + date.toString());
})

app.get('/api/persons/:id' , (request , response , next) =>{
    const id = request.params.id;
    Person.findById(id).then(person =>{
        response.json(person)
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response , next) =>{
    Person.findByIdAndDelete(request.params.id).then(result=>{
        response.status(204).end()
    }).catch(err => next(err));
})

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :customized'));
app.post('/api/persons' , (request, response) =>{
    console.log(request.body)
    const name = request.body.name;
    const number = request.body.number;

    if(name === undefined){
        response.status(400).json({
            error: "name is missing"
        })
    }
    if(number === undefined){
        response.status(400).json({
            error: "number is missing"
        })
    }
     
   const person = new Person({
       name: name,
       number: number
   })
   person.save().then(savedPerson=>{
       response.json(savedPerson);
       console.log("success : wrtie to DB ");
   }).catch(err => console.log(err))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({
      error: "unknown endpoint"
    });
  };
app.use(unknownEndpoint)


const errorHandler = (error , request , response , next) =>{
    console.log(error.message);
    if(error.name === "CastError" ){
        return response.status(400).send({
            error: "malformatted id"
        })
    }
    next(error);
}
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT , ()=> 
    console.log(`Server is running on port ${PORT}`))








