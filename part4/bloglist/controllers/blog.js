const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id
  const foundBlog = await Blog.findById(blogId)
  if (foundBlog) {
    response.json(foundBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', (request, response) => {
  const blogId = request.params.id
  const likes = request.body.likes

  Blog.findByIdAndUpdate(blogId, { likes })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Using async because findById 
  // can get malformatted id error
  const blogId = request.params.id
  const userId = decodedToken.id
  const blog = await Blog.findById(blogId)

  if (blog.user.toString() === userId.toString()) {
    await blog.remove()
    return response.json({
      success: 'successfully delete blog'
    })    
  } else {
    return response.status(401).json({
      error: 'Unauthorized action'
    })
  }
})

module.exports = blogsRouter
