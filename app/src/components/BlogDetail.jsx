import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { appendComment } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Button from '../styled/Button'
import Input from '../styled/Input'

const BlogDetail = ({ blog, handleLikes }) => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const user = users.find((user) => user.id === blog.user)
  const [updatedBlog, setUpdatedBlog] = useState(blog)
  const [newComment, setNewComment] = useState('')

  const addComment = async (event, blog, blogService) => {
    event.preventDefault()
    try {
      const comment = await blogService.createComment(blog.id, newComment)
      dispatch(appendComment({ blog: blog.id, comment }))
      setNewComment('')
    } catch (exception) {
      console.log(exception)
    }
  }

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{blog.title + ' ' + blog.author}</h2>
      <p>{blog.url}</p>
      {updatedBlog.likes} likes
      <Button
        onClick={() => handleLikes(updatedBlog, setUpdatedBlog, blogService)}
      >
        like
      </Button>
      <p>added by: {user.name}</p>
      <h3>comments</h3>
      <form onSubmit={(event) => addComment(event, blog, blogService)}>
        <Input
          name="comment"
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
          placeholder="comment"
        />
        <Button type="submit">add comment</Button>
      </form>
      {blog.comments.map((comment) => (
        <p key={comment._id}>{comment.comment}</p>
      ))}
    </div>
  )
}

export default BlogDetail
