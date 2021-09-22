import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anec.value

    // const anecdote = await anecdoteServices.createNew(content)
    dispatch(createNew(content))
    
    dispatch(newNotification(`you added "${content}"`))    
    
    event.target.anec.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit ={addAnecdote}>
        <div><input 
              name= 'anec'
            />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm