import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {apiStatus: '', userProfileData: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({apiStatus: 'SUCCESS', userProfileData: updatedData})
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  retry = () => {
    this.getProfileDetails()
  }

  render() {
    const {apiStatus, userProfileData} = this.state
    const {name, profileImageUrl, shortBio} = userProfileData
    return (
      <>
        {apiStatus === '' && null}
        {apiStatus === 'SUCCESS' && (
          <div className="profile-container">
            <img src={profileImageUrl} alt="profile" />
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        )}
        {apiStatus === 'FAIL' && (
          <button onClick={this.retry} type="button" className="logout-button">
            Retry
          </button>
        )}
      </>
    )
  }
}

export default Profile
