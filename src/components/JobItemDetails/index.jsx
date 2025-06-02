import { Component } from 'react'
import Cookies from 'js-cookie'
import { AiFillStar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { BsBriefcaseFill, BsArrowLeft } from 'react-icons/bs'
import { BiLinkExternal } from 'react-icons/bi'
import { ThreeDots } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom'

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
function withParamsAndNavigate(Component) {
  return props => <Component {...props} 
    params={useParams()} 
    navigate={useNavigate()} 
  />
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
    packagePerAnnum: data.package_per_annum,
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

  handleBackClick = () => {
    const { navigate } = this.props
    navigate(-1)
  }

  getFormattedPackage = (packageStr, employmentType) => {
    if (employmentType.toLowerCase() === 'internship') {
      // Extract numeric value from package string (e.g., "10 LPA" -> 10)
      const numericValue = parseInt(packageStr.split(' ')[0]);
      
      // Calculate stipend based on package value (8k per LPA for first 5 LPA, then 6k per additional LPA)
      const baseStipend = numericValue <= 5 
        ? numericValue * 8 
        : 40 + (numericValue - 5) * 6;
      
      return `${baseStipend/10} k/month`;
    }
    return packageStr;
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

    const formattedPackage = this.getFormattedPackage(packagePerAnnum, employmentType);

    return (
      <div className="bg-black min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={this.handleBackClick}
            className="flex items-center text-white mb-4 hover:text-indigo-400 transition-colors"
          >
            <BsArrowLeft className="mr-2" />
            Back
          </button>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="w-16 h-16 mr-4 object-contain"
              />
              <div className="flex-1">
                <h1 className="text-white text-xl font-bold mb-1">{title}</h1>
                <div className="flex items-center">
                  <AiFillStar className="text-yellow-400 text-lg" />
                  <p className="text-white ml-1 text-base">{rating}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 mb-3">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <GoLocation className="text-white text-base" />
                  <p className="text-white ml-1 text-base">{location}</p>
                </div>
                <div className="flex items-center">
                  <BsBriefcaseFill className="text-white text-base" />
                  <p className="text-white ml-1 text-base">{employmentType}</p>
                </div>
              </div>
              <p className="text-white text-base font-medium mt-2 md:mt-0">{formattedPackage}</p>
            </div>
            
            <hr className="border-gray-600 my-3" />
            
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-white text-lg font-bold">Description</h1>
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
            
            <p className="text-gray-300 text-base leading-relaxed mb-4 line-clamp-4 hover:line-clamp-none">
              {jobDescription}
            </p>
            
            <h1 className="text-white text-lg font-bold mb-3">Skills</h1>
            <ul className="flex flex-wrap gap-4 mb-5">
              {skills.map(eachSkill => (
                <SkillsCard key={eachSkill.name} skillDetails={eachSkill} compact />
              ))}
            </ul>
            
            <h1 className="text-white text-lg font-bold mb-3">Life at company</h1>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <p className="text-gray-300 text-base leading-relaxed flex-1 line-clamp-4 hover:line-clamp-none">
                {description}
              </p>
              <img
                src={imageUrl}
                alt="life at company"
                className="w-full md:w-64 h-auto rounded-lg object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-white text-xl font-bold mb-5 text-left">Similar Jobs</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarJobItemList.map(eachItem => (
              <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
            ))}
          </ul>
        </div>
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
export default withParamsAndNavigate(JobItemDetails)