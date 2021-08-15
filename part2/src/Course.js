const Course = ({course}) =>{
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce(reducer,0); 
    return(
    <p>Number of exercises {sum}</p>
  ) 
}
const reducer = (acc, currVal) => {
  return acc+currVal.exercises;
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part=> <Part key = {part.name} part = {part}/>)}
    </div>
  )
}

export default Course
