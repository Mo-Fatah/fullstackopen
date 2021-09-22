import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({filter, anecdote}) =>{
    if (filter == null){
      return anecdote
    }
    const regex = new RegExp(filter, 'i');
    return anecdote.filter(anecdote => anecdote.content.match(regex))

  })

  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(newNotification(`you voted for "${anecdote.content}"`))
    setTimeout(() => dispatch(newNotification(null)),3000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AnecdoteList