import React from 'react'

const App = () => {
  
  const course = {
 
    name : 'Half Stack application development',

    parts : [
   {
    name : 'Fundamentals of React',
    exercises : 10
   },
   {
    name : 'Using props to pass data',
    exercises :7 
   },
   {
    name :'State of a component',
    exercises :14 
   }
  ]
}
    return (
    <div>
      <Header name={course}/>
      <Content course ={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = (props) =>{
  return(
    <h1>
      {props.name.name}
    </h1>
  )
}
const Content = (props) => {
  return(
    <div>
      <p>{props.course.parts[0].name}  {props.course.parts[0].exercises}</p>
      <p>{props.course.parts[1].name}  {props.course.parts[1].exercises}</p>
      <p>{props.course.parts[2].name}  {props.course.parts[2].exercises}</p>
    </div>
  )
}
const Total = (props) => {
  
    return(
      <div>
        <p>Number of exercises {props.course.parts[0].exercises + 
        props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
      </div>
    )
}

export default App

