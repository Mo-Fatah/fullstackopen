import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog,config)
  return response.data
}

const addLike = async currBlog => {
  currBlog.likes += 1
  const response = await axios.put(`${baseUrl}/${currBlog.id}`, currBlog);
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const result = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return result.data
}


export default {
  getAll,
  create,
  setToken,
  addLike,
  remove
}