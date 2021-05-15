import React, { useState, useEffect, useRef } from 'react'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

// Import Services
import blogService from './services/blogs'
import loginService from './services/login'

// Import componenets
import Message from './components/Message'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // Using useRef to close the form for a new blog created
  const blogFormRef = useRef()

  // useEffect
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
      dispatch(setNotification('error', 'wrong credentials'))
      setTimeout(() => {
        dispatch(removeNotification())
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

  const handleCreateNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.createBlog(newBlog)
      .then(returnedBlog => {
        dispatch(setNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`))
        setBlogs(blogs.concat(returnedBlog))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 6000)
      })
  }

  return (
    <div>
      <h2>Blogs</h2>
      { <Message message={message.message} messageType={message.style} /> }
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
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm
            handleCreateNewBlog={handleCreateNewBlog}
          />
        </Togglable>
      }
      { user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs}
          setBlogs={setBlogs} updateLikes={blogService.updateLikes} destroy={blogService.destroy}
        />
      )}
    </div>
  )
}

export default App