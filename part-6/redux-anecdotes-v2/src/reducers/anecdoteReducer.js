import anecdoteService from '../services/anecdotes'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    message: ''
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)


const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_ANECDOTE':
    return action.data
  case 'SET_FILTER':
    return state.filter(f => f.content.includes(action.fil))
  default:
    return state
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}
export const anecdoteVoted = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const filterAnecdotes = (fil) => {
  return {
    type: 'SET_FILTER',
    fil
  }
}

export default reducer