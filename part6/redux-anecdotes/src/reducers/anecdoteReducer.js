import noteServices from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer =  (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.anecdote.id;
      const anecdote = state.find(anec => anec.id === id);
      const newAnec = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anec => anec.id === id ? newAnec : anec)   
    
    case 'NEW_ANEC':
      const newAnecdote = action.data 
      return [
        ...state,
        newAnecdote
      ]
    case 'ANEC_INIT':
      return action.data

    default: return state
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const anecdote = asObject(content)
    const result = await noteServices.createNew(anecdote)
    dispatch({
      type: 'NEW_ANEC',
      data: result
    }) 
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnec = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const result = await noteServices.update(newAnec)
    dispatch({
      type: 'VOTE',
      data: {
        anecdote: result
      }
    })
  }
}

export const initializeAnec = () => {
  return async dispatch => {
    const anecs = await noteServices.getAll();
    dispatch({
      type: 'ANEC_INIT',
      data: anecs
    })
  }
}

export default anecdoteReducer