const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id
    const foundBlog = await Blog.findById(blogId)
    if (foundBlog) {
      response.json(foundBlog)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/', async(request, response, next) => {

})

blogsRouter.delete('/:id', async (request, response, next) => {
  // Enclosing in a try statement because findByIdAndDelete 
  // can get malformatted id error
  try {
    const blogId = request.params.id
    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    if (deletedBlog) {
      response.status(204).json(deletedBlog)
    } else {
      response.json({ error: 'id is not found' })
    }
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter
