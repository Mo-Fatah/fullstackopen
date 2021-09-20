const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {
        ...state,
        good: state.good +1,
      }
      return newState
    
    case 'OK':
      const newStateOk = {
        ...state,
        ok: state.ok + 1,
      }
      return newStateOk

    case 'BAD':
      const newStateBad = {
        ...state,
        bad: state.bad + 1,
      }
      return newStateBad
    
    case 'ZERO':
      const stateZero = {
        good: 0,
        ok: 0,
        bad: 0,
      
      }
      return stateZero
    default: return state
  }
  
}

export default counterReducer