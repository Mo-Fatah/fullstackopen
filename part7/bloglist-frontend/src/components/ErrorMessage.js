import React from "react";

const ErrorMessage = ({errorMessage}) =>{
  if(errorMessage === null){
      return null;
  }

  const errorStyle ={
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
  }
    
  return(
      <div style = {errorStyle}>
          {errorMessage}
      </div>
  )
}
export default ErrorMessage;