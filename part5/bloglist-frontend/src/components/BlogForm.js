import React from 'react'

const BlogForm = ({title, author, url, handleNewBlog, handleCreateNewBlog}) => {
  return (
    <>
      <h2>create new</h2>
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
    </>
  )
}

export default BlogForm