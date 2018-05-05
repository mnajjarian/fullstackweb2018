import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'


const App = () => {
    const course = [
        {
        name: 'Half Stack Application Development',
        id: 1,
        part: [
            {
                name: 'React\'s Basics',
                task: 10,
                id: 1
            },
            {
                name: 'Communication with propse',
                task: 7,
                id: 2
            },
            {
                name: 'Component status',
                task: 14,
                id: 3
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        part: [
            {
                name: 'Routing',
                task: 3,
                id: 1
            },
            {
                name: 'Middlewaret',
                task: 7,
                id: 2
            }
        ]
    }
    ]    

  return (
    <Course course={course}/>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)