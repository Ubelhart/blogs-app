import PropTypes from 'prop-types'
import './styles/Notification.css'

const Notification = ({ message, type }) => (
  <div>{message && <p className={type + ' alert'}>{message}</p>}</div>
)

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default Notification
