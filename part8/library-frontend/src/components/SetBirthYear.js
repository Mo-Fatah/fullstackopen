import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthYear = ({notify}) => {
  const [ name, setName ] = useState('')
  const [ birth, setBirth ] = useState('')

  const [ editBirthYear, result ] = useMutation(SET_BIRTHYEAR, 
    {
      refetchQueries: [{query: ALL_AUTHORS}]
    }  
  )

  useEffect(() => {
    if (result.data && result.data.editAuthor === null ) {
      notify('author not found') 
    }
  })
  const submit = (event) => {
    event.preventDefault()
    editBirthYear({
      variables: {name, setBornTo: Number(birth)}
    })
    setBirth('')
    setName('')
  }
  return (
    <div>
      
      <form onSubmit = {submit}>
        <div>
          name
          <input 
            value = {name}
            onChange = {({target}) => setName(target.value)}
          />
        </div>
        <div>
          birth year
          <input 
            value = {birth}
            onChange = {({target}) => setBirth(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )

}

export default SetBirthYear