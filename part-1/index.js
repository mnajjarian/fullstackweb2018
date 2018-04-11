import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  return(
    <div>
    <h1>{props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  return(
    <div>
    <p>{props.part} {props.value}</p>
    </div>
  )
}
const Overall = (props) => {
  return(
    <div>
      <p>total of {props.total} tasks</p>
    </div>
  )
}
const App = () => {
  const name = 'Half Stack-Application Development'
  const part1 = 'React\'s Basics'
  const value1 = 10
  const part2 = 'Communication with props'
  const value2 = 7
  const part3 = 'Component status'
  const value3 = 14
  const total = value1 + value2 + value3

  return (
    <div>
      <Course name={name}/>
      <Content part={part1} value={value1}/>
      <Content part={part2} value={value2}/>
      <Content part={part3} value={value3}/>
      <Overall total={total}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)