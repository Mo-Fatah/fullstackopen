import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Filter = ({msg ,value, onChange}) =>{
  return(
    <div>{msg} 
    <input value = {value} onChange= {onChange}/>
    </div>
  )

}

export default Filter;
