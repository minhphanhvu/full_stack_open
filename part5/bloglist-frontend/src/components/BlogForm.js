import React, { useState } from 'react'

const BlogForm = ({title, author, url, handleNewBlog, handleCreateNewBlog}) => {
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  const hideWhenCancel = { display: newBlogVisible ? 'none' : '' }
  const showWhenCreate = { display: newBlogVisible ? '' : 'none' }

  const toggleBlogFormVisibility = (event) => {
    event.preventDefault()  
    setNewBlogVisible(!newBlogVisible)
  }

  return (
    <>
      <div style={hideWhenCancel}>
        <button onClick={toggleBlogFormVisibility}>create new blog</button>
      </div>
      <div style={showWhenCreate}>
        <form onSubmit={handleCreateNewBlog}>
          <div>
            title:
              <input
              type="text" 
              value={title}
              name="title"
              onChange={handleNewBlog}
              />
          </div>
          <div>
            author:
              <input
              type="text" 
              value={author}
              name="author"
              onChange={handleNewBlog}
              />
          </div>
          <div>
            url:
              <input
              type="text" 
              value={url}
              name="url"
              onChange={handleNewBlog}
              />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={toggleBlogFormVisibility}>cancel</button>
      </div>
    </>
  )
}

export default BlogForm