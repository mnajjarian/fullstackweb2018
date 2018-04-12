import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  return(
    <div>
    <h1>{props.name}</h1>
    </div>
  )
}
const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.value}</p>
    </div>
  )
}
const Content = (props) => {
  return(
    <div>
    <Part part="React's Basics" value={10}/>
    <Part part="Communication with props" value={7}/>
    <Part part="Component status" value={14}/>
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
  const value1 = 10
  const value2 = 7
  const value3 = 14
  const total = value1 + value2 + value3

  return (
    <div>
      <Course name={name}/>
      <Content />
      <Overall total={total}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)