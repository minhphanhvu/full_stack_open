import { useField } from '../hooks/index'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
  const history = useHistory()  
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    history.push('/anecdotes')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type="text" {...content} />
        </div>
        <div>
          author
          <input type="text" {...author} />
        </div>
        <div>
          url for more info
          <input type="text" {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew