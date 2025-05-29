import { AiFillStar } from 'react-icons/ai';
import { BsBriefcaseFill } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';

const SimilarJobItem = (props) => {
  const { jobDetails } = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails;

  return (
    <li className="bg-[#202020] m-5 p-7 w-[370px] rounded-xl">
      <div className="flex items-center mb-4">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="w-[60px] mr-5"
        />
        <div>
          <h1 className="text-white font-roboto text-2xl font-bold">{title}</h1>
          <div className="flex items-center">
            <AiFillStar className="text-yellow-400 mr-1 text-xl" />
            <p className="text-white">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="text-white font-roboto text-2xl mb-4">Description</h1>
      <p className="text-white font-roboto text-base leading-loose mb-4">
        {jobDescription}
      </p>
      <div className="flex mt-4">
        <div className="flex items-center mr-8">
          <GoLocation className="text-white mr-2 text-lg" />
          <p className="text-white">{location}</p>
        </div>
        <div className="flex items-center">
          <BsBriefcaseFill className="text-white mr-2 text-lg" />
          <p className="text-white">{employmentType}</p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobItem;