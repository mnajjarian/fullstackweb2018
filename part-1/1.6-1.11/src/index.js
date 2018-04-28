import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }
    handleClick = (x) => () => this.setState({[x]: this.state[x] + 1})
    
    render() {
        const total = this.state.good + this.state.neutral + this.state.bad
        const average = () => ((this.state.good - this.state.bad) / total).toFixed(1)
        const positive = () => (this.state.good / total * 100).toFixed(1) + ' %'
        const display = () => {
            if(this.state.good > 0 || this.state.neutral > 0 || this.state.bad > 0) {
                return(
                    <div>
                        <table>
                        <tbody>
                        <Statistics text='good' status={this.state.good} />
                        <Statistics text='neutral' status={this.state.neutral} />
                        <Statistics text='bad' status={this.state.bad} />
                        <Statistics text='average' status={average()} />
                        <Statistics text='positive' status={positive()} />
                        </tbody>
                        </table>
                    </div>
                )
            }
            return(
                <div>No feedback was given</div>
            )
        }
        return(
            <div>
                <h2>Give Feedback</h2>
                <Button handleClick={this.handleClick('good')} text='good' />
                <Button handleClick={this.handleClick('neutral')} text='neutral' />
                <Button handleClick={this.handleClick('bad')} text='bad' />
                <h2>Statistics</h2>
                <div>{display()}</div>
                
            </div>
        )
    }
}
const Button = ({handleClick, text}) => {
    return(
          <button onClick={handleClick} >{text}</button>
        )
}

const Statistics = ({text, status}) => {
    return(
       <tr>
           <td>{text}</td>
           <td>{status}</td>
       </tr> 
    )
}

ReactDOM.render(<App />, document.getElementById('root'))