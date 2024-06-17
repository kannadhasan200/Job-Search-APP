import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetails from '../JobDetails'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput1: '',
    searchInput: '',
    employmentType: [],
    packageValue: '',
    apiStatus: '',
    jobDetails: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const {searchInput, packageValue, employmentType} = this.state
    const type = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${packageValue}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: updatedData,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  getSearchInput = event => {
    this.setState({searchInput1: event.target.value})
  }

  checkBoxConst = (id, check) => {
    const {employmentType} = this.state
    if (check) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobsDetails,
      )
    } else {
      const index = employmentType.indexOf(id)
      employmentType.splice(index, 1)
      this.setState({employmentType}, this.getJobsDetails)
    }
  }

  getSearchedList = () => {
    const {searchInput1} = this.state
    this.setState({searchInput: searchInput1}, this.getJobsDetails)
  }

  getSalary = event => {
    this.setState({packageValue: event.target.value}, this.getJobsDetails)
  }

  render() {
    const {searchInput1, apiStatus, jobDetails} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-filter-profile-container">
          <div className="profile">
            <Profile />
            <hr />
            <h1 className="tag-name">Type of Employment</h1>
            <ul className="ul">
              {employmentTypesList.map(each => {
                const {employmentTypeId} = each
                const check = event => {
                  this.checkBoxConst(event.target.value, event.target.checked)
                }
                return (
                  <li className="li" key={employmentTypeId}>
                    <input
                      onChange={check}
                      name="check"
                      className="checkbox-input "
                      type="checkbox"
                      value={each.employmentTypeId}
                      id={each.employmentTypeId}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                )
              })}
            </ul>
            <hr />
            <h1 className="tag-name">Salary Range</h1>
            <ul className="ul">
              {salaryRangesList.map(eachVal => (
                <li className="li" key={eachVal.salaryRangeId}>
                  <input
                    onClick={this.getSalary}
                    name="salary"
                    className="checkbox-input"
                    type="radio"
                    value={eachVal.salaryRangeId}
                    id={eachVal.salaryRangeId}
                  />
                  <label htmlFor={eachVal.salaryRangeId}>{eachVal.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job">
            <input
              type="search"
              value={searchInput1}
              onChange={this.getSearchInput}
            />
            <button
              onClick={this.getSearchedList}
              className="search"
              type="button"
              data-testid="searchButton"
            >
              <BsSearch size={25} className="search-icon">
                1
              </BsSearch>
            </button>
            {jobDetails.length !== 0 && (
              <ul className="job-ul-container">
                {jobDetails.map(eachJobDetails => (
                  <JobDetails key={eachJobDetails.id} job={eachJobDetails} />
                ))}
              </ul>
            )}
            {jobDetails.length === 0 &&
              apiStatus !== '' &&
              apiStatus !== 'INITIAL' && (
                <div className="no-jobs">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                  />
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters.</p>
                </div>
              )}
            {apiStatus === 'INITIAL' && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
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
                <button onClick={this.getJobsDetails} type="button">
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
