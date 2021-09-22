import axios from "axios";
import { asObject } from "../reducers/anecdoteReducer";
const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data
}

const update = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, update }