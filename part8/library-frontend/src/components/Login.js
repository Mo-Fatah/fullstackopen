import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = ({show, notify, handleLogin}) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      handleLogin(token)
      localStorage.setItem('book-app-user-token', token)
    }
  }, [result.data])


  if( !show ) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  const submit = async (event) => {
    event.preventDefault()
    await login({variables: {username, password}})
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input 
            value={username}
            onChange = {({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login