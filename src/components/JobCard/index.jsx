import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiLocationMarker, HiMail } from 'react-icons/hi'

const JobCard = (props) => {
  const { jobDetails } = props
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link 
      to={`/jobs/${id}`} 
      className="block no-underline hover:no-underline"
    >
      <li className="bg-gray-800 rounded-xl p-6 mb-4 transition-all hover:bg-gray-700">
        <div className="flex items-start mb-6">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="w-14 h-14 md:w-16 md:h-16 mr-4 object-contain"
          />
          <div>
            <h1 className="text-white text-xl md:text-2xl font-bold mb-2">{title}</h1>
            <div className="flex items-center">
              <AiFillStar className="text-yellow-400 text-lg md:text-xl" />
              <p className="text-white ml-2 text-base md:text-lg">{rating}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex flex-wrap gap-4 md:gap-8 mb-2 md:mb-0">
            <div className="flex items-center">
              <HiLocationMarker className="text-white text-lg md:text-xl" />
              <p className="text-white ml-2 text-sm md:text-base">{location}</p>
            </div>
            <div className="flex items-center">
              <HiMail className="text-white text-lg md:text-xl ml-4 md:ml-8" />
              <p className="text-white ml-2 text-sm md:text-base">{employmentType}</p>
            </div>
          </div>
          <p className="text-white text-base md:text-lg font-medium">{packagePerAnnum}</p>
        </div>
        
        <hr className="border-gray-600 my-4" />
        
        <h1 className="text-white text-xl font-bold mb-3">Description</h1>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
          {jobDescription}
        </p>
      </li>
    </Link>
  )
}

export default JobCard