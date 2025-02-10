import { useSelector } from 'react-redux'

const Logout = ({ handleLoginOut }) => {
  const user = useSelector((state) => state.user)

  return (
    <>
      {user.name} logged in
      <button onClick={handleLoginOut}>logout</button>
    </>
  )
}

export default Logout
