import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState(0)
  const [errorMessage, setErrorMessge] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login({username, password});
      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword(''); 
      console.log(user.token);
    } catch (exception) {
      setErrorMessge('Wrong Credentials')
      setTimeout(() => {
        setErrorMessge(null)
      }, 5000) 
    }
  }

  const loginForm = () => (
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
  const blogForm = () => (

    <div>  
      <h4>{user.username} logged in</h4>
      <h3>Create new Blog</h3>
      {newBlogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <br/>
    </div>
  
  )
  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes
    }
    const response = await blogService.create(newBlog);
    setBlogAuthor('')
    setBlogLikes(0)
    setBlogTitle('')
    setBlogUrl('')
    setMessage(`a new Blog >> ${newBlog.title} << added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setBlogs(blogs.concat(newBlog)); 
  }
  const newBlogForm = () => (
    <form onSubmit= {handleNewBlog}>
      <div>
        Title
        <input
          type= "text"
          value= {blogTitle}
          name= "blog title"
          onChange= {({target}) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type= "text"
          value= {blogAuthor}
          name= "blog Author"
          onChange= {({target}) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type= "text"
          value= {blogUrl}
          name= "blog url"
          onChange= {({target}) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type= "number"
          value= {blogLikes}
          name= "blog likes"
          onChange= {({target}) => setBlogLikes(target.value)}
        />
      </div>
      <button type= "submit">submit</button> 
    </form>
  )
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage}/>
      <Notification message={message}/>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App