import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithDelay } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setUserWithDelay, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Navigation from './styled/Navigation'
import Page from './styled/Page'
import NavLink from './styled/NavLink'
import Footer from './styled/Footer'
import Body from './styled/Body'

const App = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/users/:id')
  const secondMatch = useMatch('/blogs/:id')
  const userMatch = match
    ? users.find((user) => user.id === match.params.id)
    : null
  const blogMatch = secondMatch
    ? blogs.find((blog) => blog.id === secondMatch.params.id)
    : null

  useEffect(() => {
    if (user === null) {
      return
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const logeedUser = JSON.parse(loggedUserJSON)
      dispatch(setUserWithDelay(logeedUser))
      blogService.setToken(logeedUser.token)
      return
    }
    navigate('/login')
  }, [dispatch, navigate])

  const handleLoginOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  const addBlog = (event, newBlog, setNewBlog) => {
    event.preventDefault()
    try {
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      dispatch(createBlog(newBlog))
      dispatch(
        setNotificationWithDelay(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        setNotificationWithDelay(
          'Blog already exists or invalid data',
          5,
          'error'
        )
      )
    }
  }

  const handleLikes = async (updatedBlog, setUpdatedBlog, blogService) => {
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 })
    setUpdatedBlog({ ...updatedBlog, likes: updatedBlog.likes + 1 })
  }

  return (
    <Page>
      <Navigation>
        <NavLink to="/">blogs</NavLink>
        <NavLink to="/users">users</NavLink>
        {user === null ? (
          <NavLink to="/login">login</NavLink>
        ) : (
          <Logout handleLoginOut={handleLoginOut} />
        )}
      </Navigation>
      <Body>
        <h2>blogs</h2>

        <Notification />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable buttonLabel="create new">
                  <BlogForm addBlog={addBlog} />
                </Togglable>
                <Blogs />
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route
            path="/users/:id"
            element={userMatch ? <UserDetail user={userMatch} /> : null}
          />
          <Route
            path="/blogs/:id"
            element={
              blogMatch ? (
                <BlogDetail blog={blogMatch} handleLikes={handleLikes} />
              ) : null
            }
          />
          <Route
            path="/login"
            element={
              <Togglable buttonLabel="login">
                <LoginForm />
              </Togglable>
            }
          />
        </Routes>
      </Body>

      <Footer>Blog app, by Juan Pablo Ubelhart 2025</Footer>
    </Page>
  )
}

export default App
