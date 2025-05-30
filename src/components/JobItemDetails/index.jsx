import { Component } from 'react'
import Cookies from 'js-cookie'
import { AiFillStar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { BsBriefcaseFill } from 'react-icons/bs'
import { BiLinkExternal } from 'react-icons/bi'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Wrapper component to use hooks with class component
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
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
    
    const { params } = this.props
    const { id } = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = this.getFormattedData(data.job_details)
        const updatedSkillData = data.similar_jobs.map(eachSimilarJob =>
          this.getFormattedSkillData(eachSimilarJob)
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
    } catch (error) {
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
      lifeAtCompany = {},
      skills = [],
    } = jobItemList
    const { description, imageUrl } = lifeAtCompany

    return (
      <div className="bg-black min-h-screen p-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
          <div className="flex items-start">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="w-12 h-12 mr-3"
            />
            <div>
              <h1 className="text-white text-lg font-bold mb-1">{title}</h1>
              <div className="flex items-center">
                <AiFillStar className="text-yellow-400 text-md" />
                <p className="text-white ml-1 text-sm">{rating}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 mb-2">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <GoLocation className="text-white text-sm" />
                <p className="text-white ml-1 text-sm">{location}</p>
              </div>
              <div className="flex items-center">
                <BsBriefcaseFill className="text-white text-sm" />
                <p className="text-white ml-1 text-sm">{employmentType}</p>
              </div>
            </div>
            <p className="text-white text-sm font-medium mt-1 md:mt-0">{packagePerAnnum}</p>
          </div>
          
          <hr className="border-gray-600 my-2" />
          
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-white text-md font-bold">Description</h1>
            <a 
              className="text-indigo-400 flex items-center text-sm font-semibold hover:underline"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <BiLinkExternal className="ml-1" />
            </a>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-4 hover:line-clamp-none">
            {jobDescription}
          </p>
          
          <h1 className="text-white text-md font-bold mb-2">Skills</h1>
          <ul className="flex flex-wrap gap-2 mb-3">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.name} skillDetails={eachSkill} compact />
            ))}
          </ul>
          
          <h1 className="text-white text-md font-bold mb-2">Life at company</h1>
          <div className="flex flex-col md:flex-row gap-3">
            <p className="text-gray-300 text-sm leading-relaxed flex-1 line-clamp-4 hover:line-clamp-none">
              {description}
            </p>
            <img
              src={imageUrl}
              alt="life at company"
              className="w-full md:w-48 h-auto rounded-lg object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-white text-xl font-bold mb-4 max-w-3xl mx-auto text-center my-4">Similar Jobs</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto cursor-pointer">
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
        className="w-full max-w-md mb-4"
      />
      <h1 className="text-white text-xl font-bold mb-2 text-center">Oops! Something Went Wrong</h1>
      <p className="text-gray-400 text-base mb-4 text-center">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors text-sm"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <ThreeDots 
        height="60" 
        width="60" 
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

// Export the wrapped component
export default withParams(JobItemDetails)