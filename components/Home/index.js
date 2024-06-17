import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const getJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="content-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your life abilities and
          potential.
        </p>
        <button onClick={getJobs} type="button" className="logout-button">
          <Link to="/jobs">Find Jobs</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
