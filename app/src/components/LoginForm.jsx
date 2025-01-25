import { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setErrorMessage, setUser }) => {
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
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setCredentials({ username: '', password: '' })
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            name="username"
            type="text"
            value={credentials.username}
            onChange={({ target }) => handleChange(target)}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={({ target }) => handleChange(target)}
            placeholder="Password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
