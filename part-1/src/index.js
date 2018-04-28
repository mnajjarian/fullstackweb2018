import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>{props.name} {props.value}</p>
        </div>
    )
}
const Content = (props) => {
    return(
        <div>
            <Part name={props.part1} value={props.task1} />
            <Part name={props.part2} value={props.task2} />
            <Part name={props.part3} value={props.task3} />
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
    const part1 = {
      name: 'React\'s Basics',
      task: 10
    }
    const part2 = {
      name: 'Communication with propse',
      task: 7
    }
    const part3 = {
      name: 'Component status',
      task: 14
    }

  return (
    <div>
        <Title title={course} />
        <Content part1={part1.name} part2={part2.name} part3={part3.name} task1={part1.task} task2={part2.task} task3={part3.task}/>
        <Total total={part1.task + part2.task + part3.task} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)