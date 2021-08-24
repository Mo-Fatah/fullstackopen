import React, { useState } from 'react';
import personDB from '../services/personsDB'


const Note = ({person , handleDeletePerson}) =>{
  const confirmDeletion = (person) =>{
   if(window.confirm("Delete "+ person.name + " ?")){
     personDB.remove(person.id);
     handleDeletePerson(person.id);

    }
  }

  return (
    <li>{person.name} {person.number} 
        <button 
        onClick = {() => {confirmDeletion(person)}}>
          delete
        </button>
    </li>
  )
}



const Display = ({allpersons, newFilter, handleDeletePerson}) => {
    if(newFilter.length ===0 ){
      return(
        allpersons.map(person =>
          <Note key = {person.id} person = {person} handleDeletePerson = {handleDeletePerson}/>)
      ) 
    }
    const filtered = allpersons.filter(
                    person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
    return (
      filtered.map(person =>
       <Note key = {person.id} person = {person} handleDeletePerson ={handleDeletePerson}/>)
    )
}
export default Display