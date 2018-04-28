import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Content = (props) => {
    return(
        <div>
            <p>{props.name} {props.value}</p>
        </div>
    )
}

const Total = (props) => {
    return(
    <div>
        <p>in total {props.total} tasks</p>
    </div>
    )
}


const App = () => {
  const course = 'Half Stack Application Development'
  const part1 = 'React\'s Basics'
  const task1 = 10
  const part2 = 'Communication with propse'
  const task2 = 7
  const part3 = 'Component status'
  const task3 = 14

  return (
    <div>
        <Title title={course} />
        <Content name={part1} value={task1} />
        <Content name={part2} value={task2} />
        <Content name={part3} value={task3} />
        <Total total={task1 + task2 + task3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)