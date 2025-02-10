import { useState } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Button from '../styled/Button'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [showAll, setShowAll] = useState(true)

  const handleOnClick = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <Button onClick={handleOnClick}>
        {showAll ? 'show less' : 'show more'}
      </Button>

      {showAll
        ? blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} />)
        : blogs
            .slice(0, 3)
            .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)}
    </div>
  )
}

export default Blogs
