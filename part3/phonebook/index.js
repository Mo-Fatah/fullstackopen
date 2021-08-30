const express = require('express');
const app = express() ;
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('build'))
morgan.token('customized', (req , resp) =>{
    return JSON.stringify(req.body);
})


app.get('/', (request, response) =>{
    response.send("<h1>HelloWorld</h1>")
})

app.get('/api/persons' , (request , response) =>{
    response.json(persons);
})

app.get('/info' , (request , response) =>{
    const date = new Date();
    response.send(`<h4>PhoneBook has info for ${persons.length}</h4>`
    + date.toString());
})

app.get('/api/persons/:id' , (request , response) =>{
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if(person){
        response.json(person);
    }
    else{
        response.statusMessage = "couldn't find person"
        response.status(404).send("<p>the person you requested not found</p>");
    }
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id);
    persons = persons.filter(n => n.id !== id);
    response.status(204).end();
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :customized'));
app.post('/api/persons' , (request, response) =>{
    console.log(request.body)
    const id = generateID();
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
    const findrepeated = persons.find(p => p.name === name);
    if(findrepeated){
        response.status(400).json({
            error: "name already exits"
        })
    } 
    person = {
        id:id,
        name : name,
        number : Number(number)
    }
    persons = persons.concat(person);
    response.json(person);
})


const PORT = process.env.PORT||3001;
app.listen(PORT , ()=> 
    console.log(`Server is running on port ${PORT}`))

const generateID = () =>{
    const max = 100000000000;
    return Math.floor(Math.random()*max);
}





let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
