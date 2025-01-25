import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, user }) => {
  const [view, setView] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleView = () => {
    setView(!view)
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(
      `Remove blog ${updatedBlog.title} by ${updatedBlog.author}`
    )
    if (confirmation) {
      await blogService.remove(updatedBlog.id)
      setUpdatedBlog({})
    }
  }

  return (
    <div>
      {view ? (
        updatedBlog.id ? (
          <ul style={blogStyle}>
            <li>
              {updatedBlog.title + '  '}
              <button onClick={handleView} name="hide">
                hide
              </button>
            </li>
            <li>{updatedBlog.url}</li>
            <li>
              likes: {updatedBlog.likes}
              <button
                onClick={() =>
                  handleLikes(updatedBlog, setUpdatedBlog, blogService)
                }
              >
                like
              </button>
            </li>
            <li>{updatedBlog.author}</li>
            {updatedBlog.user === user.id ? (
              <li>
                <button onClick={handleDelete}>remove</button>
              </li>
            ) : (
              ''
            )}
          </ul>
        ) : (
          ''
        )
      ) : (
        <div style={blogStyle}>
          {updatedBlog.title} {updatedBlog.author + '  '}
          <button onClick={handleView} name="view">
            view
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
