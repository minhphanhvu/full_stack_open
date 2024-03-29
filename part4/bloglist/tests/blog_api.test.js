const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blog_helper')
const user_helper = require('./user_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})

  for (let user of user_helper.initialUsers) {
    await api
      .post('/api/users')
      .send(user)
  }
})

describe('get all blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('all blogs does have unique identifier named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('get a certain blog', () => {
  test('get a certain blog back successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('login tests', () => {
  test('login successfully', async () => {
    await api
      .post('/api/login')
      .send({
        username: "test",
        password: "password"
      })
      .expect(200)
  })
  
  test('login unsuccessfully', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: "test",
        password: "WrongPassword"
      })
      .expect(401)
    
    expect(response.body.error).toBeDefined()
  })
})

describe('POST method add a blog to the db', () => {
  test('a blog is added to the blogs', async () => {
    const token = await user_helper.generateFirstUserToken()

    const newBlog = {
      title: "Full stack page",
      author: "make-up",
      url: "https://fullstackopen.com/en/",
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const authors = blogsAtEnd.map(blog => blog.author)
    expect(authors).toContain(
      'make-up'
    )
  })
  
  test('a blog without likes added will be default to 0', async () => {
    const token = await user_helper.generateFirstUserToken()

    const newBlog = {
      title: "Full stack page",
      author: "make-up",
      url: "https://fullstackopen.com/en/"
    }
  
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const blogsWithZeroLikes = blogsAtEnd.filter(blog => blog.likes === 0)
    const blog = blogsWithZeroLikes.filter(blog => blog.title === 'Full stack page')[0]
    expect(blog.author).toEqual("make-up")
  })
  
  test('a blog without title and url send back a request status 400', async () => {
    const token = await user_helper.generateFirstUserToken()

    const newBlog = {
      title: "Full stack page",
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('deletion of a blog is successful', async () => {
    const token = await user_helper.generateFirstUserToken()

    const newBlog = {
      author: 'test',
      title: "Blog to delete",
      url: 'Example.com',
      likes: 10
    }
  
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find(blog => blog.title === 'Blog to delete')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('deletion unsuccesfully when not logged in', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
