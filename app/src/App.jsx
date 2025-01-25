import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user === null) {
      return
    }
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const logeedUser = JSON.parse(loggedUserJSON)
      setUser(logeedUser)
      blogService.setToken(logeedUser.token)
    }
  }, [])

  const handleLoginOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event, newBlog, setNewBlog) => {
    event.preventDefault()
    try {
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      const newBlogToAdd = await blogService.create(newBlog)
      setBlogs([...blogs, newBlogToAdd])
      setSuccessMessage(
        `a new blog ${newBlogToAdd.title} by ${newBlogToAdd.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog already exists or invalid data')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blog List</h1>

      <Notification
        message={errorMessage ? errorMessage : successMessage}
        type={errorMessage ? 'error' : 'success'}
      />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />
        </Togglable>
      ) : (
        <div>
          <div>
            <p>
              {user.name} logged-in
              <button onClick={handleLoginOut}>logout</button>
            </p>
          </div>
          <Togglable buttonLabel="create new blog">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              addBlog={addBlog}
            />
          </Togglable>
          <Blogs blogs={blogs} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
