import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Link, Route
} from 'react-router-dom'
import CreateNew from './CreateNew'
import About from './About'
import Footer from './Footer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const Menu = ({addNew, anecdotes}) => {
  const padding = {
    paddingRight: 5
  }
  return (
     <Router>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create-new'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Switch>
        <Route path='/create-new'>
          <CreateNew addNew = {addNew}/>
        </Route>
        <Route path= '/about'>
          <About />
        </Route>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdotes={anecdotes}/>
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>

      <Footer/>

    </Router> 
  )
}

export default Menu