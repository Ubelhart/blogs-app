import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  test('for default it should render the blog title and author', () => {
    render(<Blog blog={{ title: 'test', author: 'test' }} />)
    expect(screen.getByText('test test')).toBeInTheDocument()
  })

  test('when clicking on the view button it should render the url and number of likes ', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
      id: 1,
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('url')).toBeInTheDocument()
    expect(screen.getByText('likes: 1')).toBeInTheDocument()
  })

  test('when clicking twice on the like button it should call twice to the event handler', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
      id: 1,
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleLikes={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
