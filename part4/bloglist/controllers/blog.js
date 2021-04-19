const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blogId = request.params.id
  const foundBlog = await Blog.findById(blogId)
  if (foundBlog) {
    response.json(foundBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', (request, response, next) => {
  const blogId = request.params.id
  const likes = request.body.likes

  Blog.findByIdAndUpdate(blogId, { likes })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  // Using async because findByIdAndDelete 
  // can get malformatted id error
  const blogId = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(blogId)
  if (deletedBlog) {
    response.status(204).json(deletedBlog)
  } else {
    response.json({ error: 'id is not found' })
  }
})

module.exports = blogsRouter
