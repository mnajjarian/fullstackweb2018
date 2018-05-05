import React from 'react'

const Title = (props) => <h1>{props.course.name}</h1>
const Part = (props) => <p>{props.name} {props.task}</p>
const Content = ({course}) => {
    return(
        <div>
            {course.part.map((p, i) => <Part key={i} name={p.name} task={p.task} />)}
        </div>
    )
}
const Total = ({course}) => {
    return(
    <p>in total {course.part.reduce((sum, num) => sum + num.task, 0)} tasks</p>
    )
}

const Course = ({course}) => {
    
return(
    <div>
        <Title course={course[0]} />
        <Content course={course[0]} />
        <Total course={course[0]} />
        <Title course={course[1]} />
        <Content course={course[1]} />
        <Total course={course[1]} />
    </div>
)
}

export default Course