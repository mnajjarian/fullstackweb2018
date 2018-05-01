import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: 0,
        score: []
      }
      props.anecdotes.forEach((anecdote, index) => {
        this.state.score[index] = 0
      })
    }
    handleClickNext = () => {
        const random = Math.floor(Math.random() * anecdotes.length)
        this.setState({selected: random})
    }

    handleClickVote = () => {
        const copeScore = [...this.state.score]
        copeScore[this.state.selected] += 1
        this.setState({score: copeScore})
    }
   
    render() { 
      return (
        <div>
          <DisplayAnecdotes selected={this.state.selected} score={this.state.score} anecdotes={this.props.anecdotes} 
          handleClickNext={this.handleClickNext} handleClickVote={this.handleClickVote} />

          <DisplayMostVote score={this.state.score} anecdotes={this.props.anecdotes} />
        </div>
      )
    }
  }

const DisplayAnecdotes = ({selected, handleClickNext, handleClickVote, score}) => {
    return(
        <div>
        <div>{anecdotes[selected]}</div>
        <div>has {score[selected]} votes</div>
        <button onClick={handleClickVote} >vote</button>
        <button onClick={handleClickNext} >next anecdotes</button>
        </div>
    )
}
const DisplayMostVote = ({score}) => {
    const max = Math.max(...score)
    const maxIndex = score.indexOf(max)
    return(
        <div>
            <h2>anecdotes with most votes</h2>
            <p>{anecdotes[maxIndex]}<br/>
            has {max} votes</p>
        </div>
    )
}
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))