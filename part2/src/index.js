import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Display from './Components/Display';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';

const App = () => {

  const [persons , setPersons] = useState([]);
  const [newName , setNewName] = useState('');
  const [newNumber , setNewNumber] = useState('');
  const [newFilter , setNewFilter] = useState('');
  const [allPersons, setAllPersons] = useState([]);

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
        number : newNumber
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




ReactDOM.render(<App />, document.getElementById('root'))