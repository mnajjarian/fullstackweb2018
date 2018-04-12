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
  const course = 'Half Stack-Application Development'
  const part1 = {
    name: 'React\'s Basics',
    value: 10
  }
  const part2 = {
    name: 'Communication with props',
    value: 7
  }
  const part3 = {
    name: 'Component status',
    value: 14
  }

  return (
    <div>
      <Course name={course}/>
      <Content part={part1.name} value={part1.value}/>
      <Content part={part2.name} value={part2.value}/>
      <Content part={part3.name} value={part3.value}/>
      <Overall total={part1.value + part2.value + part3.value}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)