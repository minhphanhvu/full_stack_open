import React, { useState } from 'react'

const Blog = ({blog, blogs, setBlogs, updateLikes}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)

  const hideBlog = { display: blogVisible ? 'none' : ''}
  const viewBlog = { display: blogVisible ? '' : 'none' }

  const toggleBlogVisibility = (event) => {
    event.preventDefault()
    setBlogVisible(!blogVisible)
  }

  // Handle like events
  const handleLikeClick = (event) => {
    event.preventDefault()
    const updateBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(blog.id, updateBlog).then(returnedBlog => {
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updateBlog).sort((a, b) => b.likes - a.likes))
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        <span style={{ "marginRight": 3 }}>
          {blog.title} 
        </span>
        <span style={hideBlog}>
          <button onClick={toggleBlogVisibility}>view</button>
        </span>
        <span style={viewBlog}>
          <button onClick={toggleBlogVisibility}>hide</button>
        </span>
      </div>
      <div style={viewBlog}>
        <div> 
          {blog.url}
        </div>
        <div> 
          likes {blog.likes}
          <button style={{ "marginLeft": 2 }} onClick={handleLikeClick}>like</button>
        </div>
        <div> 
          {blog.author}
        </div>
      </div>
    </div>
  )
}

export default Blog