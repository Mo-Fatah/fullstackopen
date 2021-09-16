import React from 'react';
import Blog from './Blog';
const BlogForm = ({
  user,
  handleLogout,
  newBlogForm,
  blogs,
}) => {
  return (
    <div>  
      <h4>{user.username} logged in</h4>
      <button onClick = {handleLogout}>logout</button>
      {newBlogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <br/>
    </div>
  )

} 

export default BlogForm