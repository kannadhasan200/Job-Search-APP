import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {FaShoppingBag, FaStar} from 'react-icons/fa'

import './index.css'

const JobDetails = props => {
  const {job} = props
  const {
    jobDescription,
    title,
    location,
    packagePerAnnum,
    employmentType,
    companyLogoUrl,
    rating,
    id,
  } = job
  return (
    <li className="job-list">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="location">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobDetails
