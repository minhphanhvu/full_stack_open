const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Course = (props) => (
  <div>
    <Header course={props.course} />
    <Content course={props.course} />
    <Total course={props.course} />
  </div>
)

export default Course