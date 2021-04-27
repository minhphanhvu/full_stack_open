import React, { useState } from 'react'

const Blog = ({blog}) => {
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

  return (
    <div style={blogStyle}>
      <div>
        <span style={{ "margin-right": 3 }}>
          {blog.title} 
        </span>
        <span style={hideBlog}>
          <button onClick={toggleBlogVisibility}>view</button>
        </span>
      </div>
      <div style={viewBlog}>
        <div> 
          {blog.url}
        </div>
        <div> 
          likes {blog.likes}
          <button style={{ "margin-left": 2 }}>like</button>
        </div>
        <div> 
          {blog.author}
        </div>
        <button onClick={toggleBlogVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog