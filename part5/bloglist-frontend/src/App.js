import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

// Import componenets
import Message from './components/Message'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // States for creating new blog
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  // States for messages
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  // useEffect

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  // Handle Login

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessageType('error')
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
  }

  const logout = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  // Creating new blog
  const handleNewBlog = (event) => {
    event.preventDefault()
    const updatedNewBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    const field = event.target.name
    const value = event.target.value
    updatedNewBlog[field] = value
    setNewBlog(updatedNewBlog)
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageType('success')
        setBlogs(blogs.concat(returnedBlog))
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 6000)
      })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>blogs</h2>
      { message &&  <Message message={message} messageType={messageType} /> }
      { user === null ? 
        <LoginForm 
          username={username} password={password} handleLogin={handleLogin}
          setUsername={setUsername} setPassword={setPassword} 
        /> :
        <div>
          <p>{user.name} logged-in</p>
          {logout()}
        </div>
      }
      { user !== null && 
        <BlogForm 
          title={newBlog.title} author={newBlog.author} url={newBlog.url}
          handleNewBlog={handleNewBlog}
          handleCreateNewBlog={handleCreateNewBlog}
        />
      }
      { user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App