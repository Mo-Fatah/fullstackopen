import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Note = ({person}) =>{
  return (
    <li>{person.name} {person.number}</li>
  )
}
const Display = ({persons, allpersons, newFilter}) => {
    if(newFilter.length ===0 ){
      return(
        allpersons.map(person =>
          <Note key = {person.name} person = {person}/>)
      ) 
    }
    return (persons.map(person =>
       <Note key = {person.name} person = {person}/>)
    )
}
export default Display