const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(blogId)
  if (deletedBlog) {
    response.json(deletedBlog)
  } else {
    response.json({ error: 'id is not found' })
  }
  response.status(204).end()
})

module.exports = blogsRouter
