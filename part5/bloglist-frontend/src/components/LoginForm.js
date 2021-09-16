import React from 'react';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit = {handleLogin}>
      <div>
        Username  
        <input
          type= "text"
          value = {username}
          name = "username"
          onChange= {({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type= "text"
          value= {password}
          name= "password" 
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type= "submit">login</button>
    </form>
  )
}

export default LoginForm;