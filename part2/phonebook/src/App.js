import React, { useEffect, useState } from 'react';
import Display from './Components/Display';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import personDB from './services/personsDB';
import Notification from './Components/Notification';

const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [newName , setNewName] = useState('');
  const [newNumber , setNewNumber] = useState('');
  const [newFilter , setNewFilter] = useState('');
  const [notification , setNotification] = useState(null);

  /*useEffect(() =>
    axios
        .get("http://localhost:3001/persons")
        .then(response =>{
            setAllPersons(response.data);
        })
  ,[])*/
  
useEffect(() =>{
  personDB.getAll().then(data => setAllPersons(data));
}, [])
  

  const handleInputName = (event) =>{
    setNewName(event.target.value);
  }

  const handleInputNum = (event) =>{
    setNewNumber(event.target.value);
  }
  
  const handleNotification = message =>{
    setNotification(message);
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }

  const addNote = (event) =>{

    event.preventDefault()

    if(newName.length < 1 || newNumber.length < 1) return
    
    const repeated = allPersons.filter(person => person.name === newName);

    if(repeated.length > 0){
        if(window.confirm(`${newName} already exists. Do you want to replace the old number with the new one ?`)){
          const updatedNumber = {...repeated[0] , number : newNumber}

          personDB.update(updatedNumber)
          .then(response =>{
            setAllPersons(allPersons.map(person =>
              person.id == response.id ? response : person
            ))
            handleNotification(
              `${response.name} updated Successfully`
            )
          })

        }
        return
    }

    const newObj = {
        name : newName,
        number : newNumber,
        id : allPersons.reduce((t,person) => Math.max(person.id, t),0) +1
    }
    personDB.create(newObj).then(response => {
      setAllPersons(allPersons.concat(response));
      handleNotification(`${response.name} Added Successfully`) 

    })
    setNewName(''); 
    setNewNumber('');

  }

  const handleDeletePerson = (id) =>{
    
    setAllPersons(allPersons.filter(
      person=> person.id != id
    ))

  }
  

  const handleNewFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  return (
    <div>

      <h2>PhoneBook</h2>
      <Notification message = {notification} />
      <Filter msg = 'Filter shown with' value = {newFilter} onChange={handleNewFilter}/>

      <PersonForm onSubmit = {addNote} newName = {newName}
                  namehandler = {handleInputName}
                  newNumber = {newNumber} numberhandler = {handleInputNum}/>

     <h2>Numbers</h2>
      <div>
        <ul>
          <Display allpersons = {allPersons} newFilter 
              = {newFilter} handleDeletePerson ={handleDeletePerson}/> 
        </ul>
      </div>
    </div>
  )
}

export default App