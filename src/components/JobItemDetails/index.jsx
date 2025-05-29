import { Component } from 'react'
import Cookies from 'js-cookie'
import { AiFillStar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { BsBriefcaseFill } from 'react-icons/bs'
import { BiLinkExternal } from 'react-icons/bi'
import { ThreeDots } from 'react-loader-spinner'

import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const { match } = this.props
    const { params } = match
    const { id } = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSkillData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSkillData(eachSimilarJob),
      )
      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const { jobItemList, similarJobItemList } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList
    const { description, imageUrl } = lifeAtCompany

    return (
      <div className="bg-black min-h-screen p-4 md:p-8">
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 mb-6">
          <div className="flex items-start">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="w-16 h-16 md:w-20 md:h-20 mr-4"
            />
            <div>
              <h1 className="text-white text-xl md:text-2xl font-bold mb-2">{title}</h1>
              <div className="flex items-center">
                <AiFillStar className="text-yellow-400 text-xl" />
                <p className="text-white ml-2 text-lg">{rating}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-4">
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center">
                <GoLocation className="text-white text-lg" />
                <p className="text-white ml-2 text-base">{location}</p>
              </div>
              <div className="flex items-center">
                <BsBriefcaseFill className="text-white text-lg" />
                <p className="text-white ml-2 text-base">{employmentType}</p>
              </div>
            </div>
            <p className="text-white text-lg font-medium mt-2 md:mt-0">{packagePerAnnum}</p>
          </div>
          
          <hr className="border-gray-600 my-4" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-white text-xl font-bold">Description</h1>
            <a 
              className="text-indigo-400 flex items-center text-base font-semibold hover:underline"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <BiLinkExternal className="ml-1" />
            </a>
          </div>
          
          <p className="text-gray-300 text-base leading-relaxed mb-6">{jobDescription}</p>
          
          <h1 className="text-white text-xl font-bold mb-4">Skills</h1>
          <ul className="flex flex-wrap gap-4 md:gap-6 mb-8">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          
          <h1 className="text-white text-xl font-bold mb-4">Life at company</h1>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <p className="text-gray-300 text-base leading-relaxed flex-1">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="w-full md:w-80 h-auto rounded-lg object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-white text-2xl font-bold mb-6">Similar Jobs</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {similarJobItemList.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-full max-w-md mb-6"
      />
      <h1 className="text-white text-2xl font-bold mb-2 text-center">Oops! Something Went Wrong</h1>
      <p className="text-gray-400 text-lg mb-6 text-center">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )

  renderJobViews = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-black">
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails