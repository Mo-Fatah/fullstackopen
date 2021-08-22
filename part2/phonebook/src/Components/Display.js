import React, { useState } from 'react';

const Note = ({person}) =>{
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Display = ({persons, allpersons, newFilter}) => {
    if(newFilter.length ===0 ){
      return(
        allpersons.map(person =>
          <Note key = {person.id} person = {person}/>)
      ) 
    }
    return (persons.map(person =>
       <Note key = {person.id} person = {person}/>)
    )
}
export default Display