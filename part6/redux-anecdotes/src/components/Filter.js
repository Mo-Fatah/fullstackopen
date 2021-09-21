import React from 'react'
import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    dispatch(createFilter(event.target.value))
  }

  return (
    <div>
      <input
        onChange = {handleChange}
      />
    </div>
  )
}

export default Filter