import './styles/Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  return <div>{message && <p className={type + ' alert'}>{message}</p>}</div>
}

export default Notification
