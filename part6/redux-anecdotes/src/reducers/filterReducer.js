import React from 'react'

const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
      
    default:
      return state
  }
}
export const createFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}
export default filterReducer