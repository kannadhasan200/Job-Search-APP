import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({showErrorMsg: true, errorMsg})
    }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showErrorMsg, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="main-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <form onSubmit={this.submitForm}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              value={username}
              onChange={this.getUsername}
              id="username"
              placeholder="Username"
              type="text"
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              value={password}
              onChange={this.getPassword}
              id="password"
              placeholder="Password"
              type="password"
            />
            <br />
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
