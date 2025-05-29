import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] bg-cover h-[95vh]">
        <div className="flex flex-col justify-center w-[650px] p-4 ml-6">
          <h1 className="text-[64px] font-bold text-white mt-8">
            Find The Job That Fits Your Life
          </h1>
          <p className="text-white text-2xl font-normal leading-[1.8] mt-6">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="no-underline">
            <button
              type="button"
              className="bg-[#4f46e5] py-4 px-4 text-white font-medium w-[140px] border-none rounded-lg mt-9 text-base"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home