import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {FaShoppingBag, FaStar} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

class JobDetailedView extends Component {
  state = {
    apiStatus: '',
    job: [],
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedData = {
        companyWebsite: jobDetails.company_website_url,
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        location: jobDetails.location,
        jobDescription: jobDetails.job_description,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
      }
      const {skills} = updatedData
      const updatedSkills = skills.map(eachSkill => ({
        skillImage: eachSkill.image_url,
        skillName: eachSkill.name,
      }))
      const similarJobs = data.similar_jobs
      const updatedSimilar = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        rating: each.rating,
        title: each.title,
      }))

      const {lifeAtCompany} = updatedData
      const companyLife = {
        imageUrl: lifeAtCompany.image_url,
        description: lifeAtCompany.description,
      }

      this.setState({
        job: updatedData,
        similarJobs: updatedSimilar,
        lifeAtCompany: companyLife,
        skills: updatedSkills,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  render() {
    const {job, apiStatus, similarJobs, lifeAtCompany, skills} = this.state
    const {
      companyLogoUrl,
      employmentType,
      rating,
      packagePerAnnum,
      title,
      jobDescription,
      location,
      companyWebsite,
    } = job
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="background">
        <Header />
        {apiStatus === 'INITIAL' && (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
        {apiStatus === 'FAIL' && (
          <div className="loader-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button onClick={this.getJob} type="button">
              Retry
            </button>
          </div>
        )}
        {apiStatus === 'SUCCESS' && (
          <div className="description-job-details">
            <div className="apply">
              <div className="location">
                <img
                  className="company-logo"
                  src={companyLogoUrl}
                  alt="job details company logo"
                />
                <div>
                  <h1>{title}</h1>
                  <div className="location">
                    <FaStar className="rating" />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>
              <div className="pack">
                <div className="location">
                  <div className="location">
                    <MdLocationOn />
                    <p>{location}</p>
                  </div>
                  <div className="location">
                    <FaShoppingBag />
                    <p>{employmentType}</p>
                  </div>
                </div>
                <p>{packagePerAnnum}</p>
              </div>
              <hr />
              <h1>Description</h1>
              <a href={companyWebsite}>Visit</a>
              <p>{jobDescription}</p>
              <h1>Skills</h1>
              <ul className="skills-container">
                {skills.map(eachSkills => (
                  <li key={eachSkills.skillName} className="location">
                    <img
                      src={eachSkills.skillImage}
                      alt={eachSkills.skillName}
                    />
                    <p>{eachSkills.skillName}</p>
                  </li>
                ))}
              </ul>
              <h1>Life at Company</h1>
              <div className="dis">
                <p>{description}</p>
                <img src={imageUrl} alt="life at company" />
              </div>
            </div>
            <h1>Similar Jobs</h1>
            <ul>
              {similarJobs.map(eachJob => (
                <li key={eachJob.id}>
                  <div className="location">
                    <img
                      className="company-logo"
                      src={eachJob.companyLogoUrl}
                      alt=" similar job company logo"
                    />
                    <div>
                      <h1>{eachJob.title}</h1>
                      <div className="location">
                        <FaStar className="rating" />
                        <p>{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pack">
                    <div className="location">
                      <div className="location">
                        <MdLocationOn />
                        <p>{eachJob.location}</p>
                      </div>
                      <div className="location">
                        <FaShoppingBag />
                        <p>{eachJob.employmentType}</p>
                      </div>
                    </div>
                  </div>
                  <h1>Description</h1>
                  <p>{eachJob.jobDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default JobDetailedView
