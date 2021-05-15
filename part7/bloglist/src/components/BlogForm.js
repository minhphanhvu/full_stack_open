import React, { useState } from 'react'

const BlogForm = ({ handleCreateNewBlog }) => {

  // States for creating new blog
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  // Handle changes in input fields
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

  // Add new blog
  const addBlog = (event) => {
    event.preventDefault()
    handleCreateNewBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleNewBlog}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm