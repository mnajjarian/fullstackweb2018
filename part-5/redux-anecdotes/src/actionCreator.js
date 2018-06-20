const actionFor = {
    addVote(id) {
      return {
        type: 'ADD_VOTE',
        data: {id}
      }
    },
    addAnecdote(anecdote) {
      return {
        type: 'ADD_ANECDOTE',
        data: anecdote
      }
    }
  }

export default actionFor