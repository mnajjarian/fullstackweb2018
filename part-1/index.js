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
  const part = [
  {
    name: 'React\'s Basics',
    value: 10
  },
  {
    name: 'Communication with props',
    value: 7
  },
  {
    name: 'Component status',
    value: 14
  }
]

  return (
    <div>
      <Course name={course}/>
      <Content part={part[0].name} value={part[0].value}/>
      <Content part={part[1].name} value={part[1].value}/>
      <Content part={part[2].name} value={part[2].value}/>
      <Overall total={part[0].value + part[1].value + part[2].value}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)