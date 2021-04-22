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

// Get token from bearer authorization request
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
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
