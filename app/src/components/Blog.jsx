import PropTypes from 'prop-types'
import NavLink from '../styled/NavLink'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <NavLink to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author + '  '}
      </NavLink>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
