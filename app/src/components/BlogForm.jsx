import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })

  const handleChange = ({ name, value }) => {
    if (name in newBlog) {
      setNewBlog({
        ...newBlog,
        [name]: name === 'likes' ? Number(value) : value,
      })
    }
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={(event) => addBlog(event, newBlog, setNewBlog)}>
        <div>
          <input
            name="title"
            type="text"
            value={newBlog.title}
            onChange={({ target }) => handleChange(target)}
            placeholder="Title"
          />
        </div>
        <div>
          <input
            name="author"
            type="text"
            value={newBlog.author}
            onChange={({ target }) => handleChange(target)}
            placeholder="Author"
          />
        </div>
        <div>
          <input
            name="url"
            type="text"
            value={newBlog.url}
            onChange={({ target }) => handleChange(target)}
            placeholder="URL"
          />
        </div>
        <div>
          <input
            name="likes"
            type="number"
            value={newBlog.likes}
            onChange={({ target }) => handleChange(target)}
            placeholder="Likes"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
}

export default BlogForm
