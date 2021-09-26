import React, { useState } from 'react'
import { render } from 'react-dom'
import { useDispatch } from 'react-redux'
import { addLike, remove } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false)

  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const TogglesetDetailed = () => {
    setDetailed(!detailed)
  }

  const handleLikeAddition = (event) => {
    event.preventDefault()
    dispatch(addLike(blog)) 
  }

  const handleDeletion = async (event) => {
    event.preventDefault()
    if(window.confirm(`delete the "${blog.title}" blog ? this action cannot be undone`)) {
      dispatch(remove(blog))  
    }
  }

  const viewDetailed = () => {
    return (
      <div style = {blogStyle}>
        <p>Title: {blog.title} <button onClick = {TogglesetDetailed}>hide</button>
        </p>
        <p>Author: {blog.author}</p>
        <p>Link: {blog.url}</p>
        <p>Likes: {blog.likes}
          <button onClick = {handleLikeAddition}>like</button>
        </p>
        <button onClick = {handleDeletion}>remove</button>
      </div>
    )
  }

  const viewMinimal = () => {
    return (
      <div>
        {blog.title}. by {blog.author}
        <button onClick = {TogglesetDetailed}>view</button>
      </div>
    )
  }
  return (
    <div className = 'blog'>
      {detailed ? viewDetailed() : viewMinimal()}
    </div>
  )
}

export default Blog