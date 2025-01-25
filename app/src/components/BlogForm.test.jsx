import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('for defautl it should call the addBlog funtion when clicking on the create button', async () => {
    const mockHandler = vi.fn()
    render(<BlogForm addBlog={mockHandler} />)

    const user = userEvent.setup()

    const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
