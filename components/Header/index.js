import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <ul className="header-ul">
        <li className="list-element">
          <Link to="/">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </Link>
        </li>
        <li className="list-element">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="list-element">
          <Link className="link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <button onClick={logout} className="logout-button" type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
