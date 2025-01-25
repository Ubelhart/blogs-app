import { useState } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
  const [showAll, setShowAll] = useState(true)

  const handleOnClick = () => {
    setShowAll(!showAll)
  }

  const handleLikes = async (updatedBlog, setUpdatedBlog, blogService) => {
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 })
    setUpdatedBlog({ ...updatedBlog, likes: updatedBlog.likes + 1 })
  }

  return (
    <div>
      <h2>blogs</h2>

      <button onClick={handleOnClick}>
        {showAll ? 'show less' : 'show more'}
      </button>

      {showAll
        ? blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                user={user}
                key={blog.id}
                blog={blog}
                handleLikes={handleLikes}
              />
            ))
        : blogs.slice(0, 3).map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs
