import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { initilizeBlog } from './reducers/blogReducer'
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

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initilizeBlog())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user.token)
    } catch (exception) {
      setErrorMessge('Wrong Credentials')
      setTimeout(() => {
        setErrorMessge(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm  handleLogin = {handleLogin}
                  username = {username}
                  setUsername = {setUsername}
                  password = {password}
                  setPassword = {setPassword}
            
      />
    )
  }

  const blogForm = () => {
    return <BlogForm user = {user}
                     handleLogout = {handleLogout}
                     newBlogForm = {newBlogForm}
          />
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogAuthor('')
    setBlogLikes(0)
    setBlogTitle('')
    setBlogUrl('')
    setMessage(`a new Blog >> ${newBlog.title} << added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    console.log(returnedBlog);
    setBlogs(blogs.concat(returnedBlog))
  }


  const newBlogForm = () => {
    return (
      <Togglable buttonLabel = "create new Blog">
        <NewBlogForm  handleNewBlog = {handleNewBlog}
                      blogTitle = {blogTitle}
                      setBlogTitle = {setBlogTitle}
                      blogAuthor = {blogAuthor}
                      setBlogAuthor = {setBlogAuthor}
                      blogUrl = {blogUrl}
                      setBlogUrl = {setBlogUrl}
                      blogLikes = {blogLikes}
                      setBlogLikes = {setBlogLikes}
        />
      </Togglable>
    )
  }

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