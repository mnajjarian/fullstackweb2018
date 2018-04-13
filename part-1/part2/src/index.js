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
  
  clickGood = () => this.setState({good: this.state.good + 1})
  clickNeutral = () => this.setState({neutral: this.state.neutral + 1})
  clickBad = () => this.setState({bad: this.state.bad + 1})

  render() {
    const Title = ({title}) => <h1>{title}</h1>
    const Button = ({handleClick, text}) => (
      <button onClick={handleClick}>{text}</button>
    )
  const total = this.state.good + this.state.neutral + this.state.bad
  const average = () => ((this.state.good - this.state.bad) / total).toFixed(1)
  const positive = () => (this.state.good / (total) * 100).toFixed(1) + ' %'
  const Statistics = ({text, counter}) => <tr><td>{text} {counter}</td></tr>
  const Display = () => {
    if(total === 0) {
      return(
        <div><p>No feedback was given</p></div>
      )
    }
    return(
     <div>
       <table>
         <tbody>
      <Statistics text='good' counter={this.state.good} />
      <Statistics text='neutral' counter={this.state.neutral} />
      <Statistics text='bad' counter={this.state.bad} />
      <Statistics text='average' counter={average()} />
      <Statistics text='positive' counter={positive()} />
         </tbody>
       </table>
      </div>

    )
  } 
    return(
    <div>
      <Title title='Feedback'/>
      <Button handleClick={this.clickGood} text='good' />
      <Button handleClick={this.clickNeutral} text='neutral' />
      <Button handleClick={this.clickBad} text='bad' />
      <Title title='Statistics' />
      <Display />
      
    </div>
    )
}
}
ReactDOM.render(<App/>, document.getElementById('root'))