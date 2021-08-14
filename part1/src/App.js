import React, { useState } from 'react'

const Button = ({action , text}) =>{
    return(
      <button onClick = {action}>{text}</button>
    )  
}

const Display = ({number , text}) => <div>{text}s : {number}</div>

const App = () => {
  const [good , setGood] = useState(0);
  const [bad , setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const goodClicked = () => setGood(good +1)
  const badClicked = () => setBad(bad +1 )
  const neutralClicked = () => setNeutral(neutral+1)




  return(
    <div>
      <h1>Give Feedback</h1>
      <Button action = {goodClicked} text = 'Good' />
      <Button action = {badClicked} text = 'bad' />
      <Button action = {neutralClicked} text = 'neutral' />
      <br/><br/><br/><br/>
      <h2>Statistics</h2>
      <Display number = {good} text = 'Good'/>
      <Display number = {bad} text = 'bad'/>
      <Display number = {neutral} text = 'neutral'/>
    </div>
  )  
}

export default App

