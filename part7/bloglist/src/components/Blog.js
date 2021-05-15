import React, { useState } from 'react'

const Blog = ({ blog, blogs, setBlogs, updateLikes, destroy, setMessage, setMessageType }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)

  const hideBlog = { display: blogVisible ? 'none' : '' }
  const viewBlog = { display: blogVisible ? '' : 'none' }

  const toggleBlogVisibility = (event) => {
    event.preventDefault()
    setBlogVisible(!blogVisible)
  }

  // Handle like events
  const handleLikeClick = (event) => {
    event.preventDefault()
    const updateBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(blog.id, updateBlog).then(() => {
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updateBlog).sort((a, b) => b.likes - a.likes))
    })
  }

  // Delete a blo
  const handleDelete = (event) => {
    event.preventDefault()
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmation) {
      destroy(blog.id)
        .then(response => {
          if (response.status === 204) {
            setMessageType('success')
            setMessage('Delete Success')
            setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => b.likes - a.likes))
          }
          else {
            setMessageType('error')
            setMessage('Unauthorized action')
          }
        })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span style={{ 'marginRight': 3 }}>
          {blog.title}
        </span>
        <span style={hideBlog}>
          <button onClick={toggleBlogVisibility}>view</button>
        </span>
        <span style={viewBlog}>
          <button onClick={toggleBlogVisibility}>hide</button>
        </span>
      </div>
      <div style={viewBlog} className='togglableBlogDetails'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button style={{ 'marginLeft': 2 }} onClick={handleLikeClick}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button style={{ 'marginLeft': 3 }} onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog