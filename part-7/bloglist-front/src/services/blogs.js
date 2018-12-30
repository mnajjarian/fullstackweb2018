import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const create = async (newObject, config) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addComment = async(blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

const update = async (blogId, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const remove = async (blogId, config) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, create, update, remove, addComment }