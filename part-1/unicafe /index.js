import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  render() {
    return(
    <div>
      <h2>anna palautetta</h2>
      <button onClick={() => this.setState({good: this.state.good + 1})} >good</button>
      <button onClick={() => this.setState({neutral: this.state.neutral + 1})} >neutral</button>
      <button onClick={() => this.setState({bad: this.state.bad + 1})}>bad</button>
      <h2>statistics</h2>
      <p>good {this.state.good}<br/>
         neutral {this.state.neutral}<br/>
         bad {this.state.bad}</p>
    </div>
    )
}
}
ReactDOM.render(<App/>, document.getElementById('root'))