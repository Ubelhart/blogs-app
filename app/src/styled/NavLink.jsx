import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: #f5df4d;
  }
`

export default NavLink
