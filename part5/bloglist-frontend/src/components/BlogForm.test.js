import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test.only('the form calls event handler with the right props', () => {
  let component
  const handleCreateNewBlog = jest.fn()

  component = render(
    <BlogForm handleCreateNewBlog={handleCreateNewBlog} />
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(url, {
    target: { value: 'test-url.com' }
  })
  fireEvent.submit(form)

  expect(handleCreateNewBlog.mock.calls).toHaveLength(1)
  expect(handleCreateNewBlog.mock.calls[0][0].author).toBe('test author')
})