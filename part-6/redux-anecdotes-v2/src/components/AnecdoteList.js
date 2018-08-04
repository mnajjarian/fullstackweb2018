import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { anecdoteVoted } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
handleVote = async (anecdoteId) => {
  const oldAnecdote = this.props.anecdotes.filter(f => f.id === anecdoteId)
  const anecdote = { ...oldAnecdote[0], votes: oldAnecdote[0].votes + 1 }
  await anecdoteService.update(anecdote)

  this.props.anecdoteVoted(anecdoteId)
  this.props.notify(`you voted '${anecdote.content}'`, 10)
}

render() {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          {anecdote.content}
          <div>
              has {anecdote.votes}
            <button onClick={() => this.handleVote(anecdote.id)}>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

export default connect(
  mapStateToProps,
  { anecdoteVoted,
    notify }
)(AnecdoteList)
