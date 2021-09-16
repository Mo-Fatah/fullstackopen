import React, { useState } from 'react'
import blogServices from '../services/blogs';

const Blog = ({blog, setBlogs, blogs}) => {
  const [detailed, setDetailed] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const TogglesetDetailed = () => {
    setDetailed(!detailed);
  }

  const handleLikeAddition = (event) => {
    event.preventDefault();
    blogServices.addLike(blog);
    setLikes(blog.likes + 1);
  }

  const handleDeletion = async (event) => {
    if(window.confirm(`delete the "${blog.title}" blog ? this action cannot be undone`)) {
      event.preventDefault();
      await blogServices.remove(blog);
      setBlogs(blogs.filter(b => b.id !== blog.id));
      
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
        {blog.title}
        <button onClick = {TogglesetDetailed}>view</button>
      </div>
    )
  }
  return (  
    <div>
    {detailed ? viewDetailed() : viewMinimal()}
    </div>
  )
  
}

export default Blog