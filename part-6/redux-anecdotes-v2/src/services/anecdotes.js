import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const response = await axios.post(url, { content, id: getId(), votes: 0 })
  return response.data
}

const update = async (newObject) => {
  const id = newObject.id
  const response = await axios.put(`${url}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, update }