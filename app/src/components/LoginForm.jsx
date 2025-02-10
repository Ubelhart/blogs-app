import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserWithDelay } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationWithDelay } from '../reducers/notificationReducer'
import Button from '../styled/Button'
import Input from '../styled/Input'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = ({ name, value }) => {
    if (name in credentials) {
      setCredentials({ ...credentials, [name]: value })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      dispatch(setUserWithDelay(loggedUser))
      blogService.setToken(loggedUser.token)
      setCredentials({ username: '', password: '' })
      navigate('/')
    } catch (exception) {
      dispatch(setNotificationWithDelay('Wrong username or password'))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username: </label>
          <Input
            name="username"
            type="text"
            value={credentials.username}
            onChange={({ target }) => handleChange(target)}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <Input
            name="password"
            type="password"
            value={credentials.password}
            onChange={({ target }) => handleChange(target)}
            placeholder="Password"
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
