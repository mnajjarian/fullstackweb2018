import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistics = () => {
  const feedbacks =  {...store.getState()}
  const total = feedbacks.good + feedbacks.bad + feedbacks.ok
  const average = ((feedbacks.good - feedbacks.bad) / total).toFixed(1)
  const positive = (feedbacks.good / total * 100).toFixed(1) + ' %'

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>no feedback was given</div>
      </div>
    )
  }
  
  return(
    <div>
      
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{feedbacks.good}</td>
          </tr>
          <tr>
            <td>Ok</td>
            <td>{feedbacks.ok}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{feedbacks.bad}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={e => store.dispatch({type: 'ZERO'})} >reset the statistics</button>
    </div>
  )
}

class App extends React.Component {
  click = (button) => {
    return () => 
   store.dispatch({type: button})
  }

  render() {
    return(
      <div>
        <h2>Give feedback</h2>
        
        <button onClick={this.click('GOOD')}>Good</button>
        <button onClick={this.click('OK')}>Ok</button>
        <button onClick={this.click("BAD")}>Bad</button>
        <Statistics />
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)

