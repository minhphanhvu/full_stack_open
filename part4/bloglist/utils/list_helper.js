const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((result, blog) => result + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const compare = (blogA, blogB) => {
    if (blogA.likes > blogB.likes) {
      return 1
    } else if (blogA.likes < blogB.likes) {
      return -1
    } else {
      return 0
    }
  }

  return blogs.sort(compare)[blogs.length - 1]
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    } else {
      authors[blog.author].blogs += 1
    }
    return authors
  }, {})

  return Object.keys(authors).reduce((mostBlogsAuthor, name) => {
    if (authors[name].blogs > (mostBlogsAuthor.blogs||0)) {
      return authors[name]
    }
    return mostBlogsAuthor
  }, {})
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
    } else {
      authors[blog.author].likes += blog.likes
    }
    return authors
  }, {})

  return Object.keys(authors).reduce((mostBlogsAuthor, name) => {
    if (authors[name].likes > (mostBlogsAuthor.likes||0)) {
      return authors[name]
    }
    return mostBlogsAuthor
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
