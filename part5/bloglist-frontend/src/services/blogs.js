import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateLikes = async (blogId, blogToUpdate) => {
  const response = await axios.put(baseUrl + `/${blogId}`, blogToUpdate)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const destroy = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + `/${blogId}`, config)
  return response
}

export default { getAll, setToken, create, updateLikes, destroy }