import React, { useEffect, useState } from "react";
import Weather from "./Weather";

const Country = (props) =>{
    if(props.countries.length == 0 || props.filter.length ==0) 
        return <div></div>
    
    const filtered = props.countries.filter(
        country => country.name.toLowerCase()
        .includes(props.filter.toLowerCase()));
      
    if(filtered.length >= 10){
        return <p>Too many matches, Please be more specific</p>
    }

    if(filtered.length ==0){
        return <p></p>
    }

    if(filtered.length ==1){
        return <DisplayCountry filtered = {filtered} />
    }

    else{
        return (
        <ul>
            {filtered.map(country => 
            <li key = {country.name}>
                {country.name}
                <button onClick ={props.buttonClicked} country = {country.name}>
                    show
                </button>
            </li>)
            }
        </ul>)

    }
}
const DisplayCountry = (props) =>{
    const country = props.filtered[0];
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}<br/>
                population {country.population} 
            </p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(lan => 
                <li key = {lan.name}>{lan.name}</li>)}
            </ul>
            <br/>
            <img src = {country.flag} alt = {`${country.name} flag`}
            width = "400"  height = "250"/>
            <br/>
            <Weather capital = {country.capital}/>

        </div>
    )
}

export default Country;