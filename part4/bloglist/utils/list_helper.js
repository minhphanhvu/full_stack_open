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

const mostBlogs 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
