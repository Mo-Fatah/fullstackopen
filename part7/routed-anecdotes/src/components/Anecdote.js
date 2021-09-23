import { useParams } from "react-router-dom"

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anec => anec.id === id)
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>by {anecdote.author}</p>
      <p>has {anecdote.votes} votes</p>
      <p>for mote info visit <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote