import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // States for creating new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // States for messages
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
  )

  const logout = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  // Creating new blog
  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

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
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createNewBlog = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
            <input
            type="text" 
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input
            type="text" 
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input
            type="text" 
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
      <button type="submit">create</button>
      </form>
    </>
  )

  const displayMessage = () => (
    <>
      <div className={messageType}>
        {message}
      </div>
    </>
  )

  return (
    <div>
      <h2>blogs</h2>
      {message && displayMessage()}
      {user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {logout()}
        </div>
      }
      {user !== null && createNewBlog()}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App