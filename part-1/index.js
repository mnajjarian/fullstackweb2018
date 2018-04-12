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
  const course = {
      name: 'Half Stack-Application Development',
      part: [
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
  }

  return (
    <div>
      <Course name={course.name}/>
      <Content part={course.part[0].name} value={course.part[0].value}/>
      <Content part={course.part[1].name} value={course.part[1].value}/>
      <Content part={course.part[2].name} value={course.part[2].value}/>
      <Overall total={course.part[0].value + course.part[1].value + course.part[2].value}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)