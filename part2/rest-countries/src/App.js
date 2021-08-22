import axios from "axios";
import React, { useEffect, useState } from "react";
import Country from "./Components/Country";

const  App = () => {
  
  const [countries, setCountries] = useState([]);
  const [newFilter , setnewFilter] = useState(''); 


  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
          setCountries(response.data)
      })
  },[])


  const searchHandler = (event)=>{
    setnewFilter(event.target.value);
      
    } 

  const buttonClicked=(event)=>{
    console.log(event.target.attributes.country.value);

    setnewFilter(event.target.attributes.country.value)
  }



  return(
    <div>
      <div>find countries</div>  
      <input value = {newFilter} onChange= {searchHandler}></input>
      <div>
        <ul>
          <Country filter = {newFilter} countries = {countries} 
          buttonClicked = {buttonClicked}/>
        </ul>
      </div>
    </div>
  )

}

export default App;
