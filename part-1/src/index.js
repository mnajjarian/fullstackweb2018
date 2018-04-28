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
    const part = [
        {
            name: 'React\'s Basics',
            task: 10
        },
        {
            name: 'Communication with propse',
            task: 7
        },
        {
            name: 'Component status',
            task: 14
        
        }
    ]

  return (
    <div>
        <Title title={course} />
        <Content part1={part[0].name} part2={part[1].name} part3={part[2].name} task1={part[0].task} task2={part[1].task} task3={part[2].task}/>
        <Total total={part[0].task + part[1].task + part[2].task} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)