import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')   

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
       content,
      author,
      info,
      votes: 0
    });
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')

  }

  const handlereset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author}/>
        </div>
        <div>
          url for more info
          <input  {...info}/>
        </div>
        <button type ='submit'>create</button>
        <button type='reset' onClick={handlereset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew