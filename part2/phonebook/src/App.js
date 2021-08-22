import React, { useEffect, useState } from 'react';
import Display from './Components/Display';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import axios from 'axios';


const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [persons , setPersons] = useState([]);
  const [newName , setNewName] = useState('');
  const [newNumber , setNewNumber] = useState('');
  const [newFilter , setNewFilter] = useState('');

  useEffect(() =>
    axios
        .get("http://localhost:3001/persons")
        .then(response =>{
            setAllPersons(response.data);
        })
  ,[])  
  

  const handleInputName = (event) =>{
    setNewName(event.target.value);
  }

  const handleInputNum = (event) =>{
    setNewNumber(event.target.value);
  }

  const addNote = (event) =>{
    event.preventDefault()
    if(newName.length < 1 || newNumber.length < 1) return
    if(allPersons.filter(person => person.name === newName).length > 0){
      window.alert(`${newName} already exists`)
      return;
    }
    const newObj = {
        name : newName,
        number : newNumber,
        id : allPersons.length+1
    }
    setAllPersons(allPersons.concat(newObj))
    setNewName(''); 
    setNewNumber('')
  }
  

  const handleNewFilter = (event) =>{
    setNewFilter(event.target.value)
    console.log(newFilter);
    const filtered =  allPersons.filter(person => person.name.includes(newFilter));
    console.log(filtered);
    console.log(filtered.length);
    setPersons(filtered);

  }

  return (
    <div>

      <h2>PhoneBook</h2>
      <Filter msg = 'Filter shown with' value = {newFilter} onChange={handleNewFilter}/>

      <PersonForm onSubmit = {addNote} newName = {newName}
                  namehandler = {handleInputName}
                  newNumber = {newNumber} numberhandler = {handleInputNum}/>

     <h2>Numbers</h2>
      <div>
        <ul>
          <Display persons = {persons} allpersons = {allPersons} newFilter 
              = {newFilter}/> 
        </ul>
      </div>
    </div>
  )
}

export default App