import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteServices from './services/anecdotes'
import { initializeAnec } from './reducers/anecdoteReducer'

const App = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(initializeAnec())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />    
      <AnecdoteForm />
    </div>
  )
}

export default App