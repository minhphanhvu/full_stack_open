import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: "Title 1",
      author: "Example Author",
      likes: 10,
      url: "example.com"
    }

    const blogs = [
      {
        title: "Title 1",
        author: "Example Author",
        likes: 10,
        url: "example.com"
      },
      {
        title: "Title 1",
        author: "Example Author",
        likes: 10,
        url: "example.com"
      },
      {
        title: "Title 1",
        author: "Example Author",
        likes: 10,
        url: "example.com"
      },      
    ]

    component = render(
      <Blog blog={blog} />
    )
  })

  test('display title', () => {
    expect(component.container).toHaveTextContent(
      'Title 1'
    )
    expect(component.container.querySelector('.blog')).toBeDefined()
  })

  test('url and likes are not rendered by default', () => {
    const div = component.container.querySelector('.togglableBlogDetails')
    expect(div).toHaveStyle('display: none')
  })
})