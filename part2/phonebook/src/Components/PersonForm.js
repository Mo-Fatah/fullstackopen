import React, { useState } from 'react';
import ReactDOM from 'react-dom';

 const PersonForm = (props) =>{
    return(
     <form onSubmit = {props.onSubmit}>
        <div>
          name : <input value = {props.newName} onChange={props.namehandler} />
          number : <input value = {props.newNumber} onChange={props.numberhandler} />
        </div>
        <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
    )
 }
 export default PersonForm