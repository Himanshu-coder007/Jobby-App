import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { BsSearch } from 'react-icons/bs';
import Cookies from 'js-cookie';
import JobCard from '../JobCard';
import JobsFilterGroup from '../JobsFilterGroup';

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
];

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
];

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getJobDetails();
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const jwtToken = Cookies.get('jwt_token');
    const { salaryRange, employmentType, searchInput } = this.state;
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }));
        this.setState({
          jobsList: updatedData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        });
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  changeSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails();
    }
  };

  changeSalaryRange = salary => {
    this.setState({ salaryRange: salary }, this.getJobDetails);
  };

  changeEmploymentType = type => {
    this.setState(
      prev => ({ employmentType: [...prev.employmentType, type] }),
      this.getJobDetails,
    );
  };

  renderJobDetails = () => {
    const { jobsList, searchInput } = this.state;
    const jobsDisplay = jobsList.length > 0;

    return jobsDisplay ? (
      <div className="w-full flex flex-col items-center">
        <div className="flex w-full max-w-[500px] bg-transparent rounded-lg p-2 outline-none my-4 border border-gray-500">
          <input
            type="search"
            className="bg-transparent text-white font-roboto text-sm font-medium border-none outline-none flex-grow px-4 py-1"
            placeholder="Search and Enter"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="bg-transparent border-none"
            onClick={this.getJobDetails}
          >
            <BsSearch className="text-white text-xl" />
          </button>
        </div>
        <ul className="list-none flex flex-col w-full items-center">
          {jobsList.map(eachData => (
            <JobCard key={eachData.id} jobDetails={eachData} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex w-full max-w-[500px] bg-transparent rounded-lg p-2 outline-none my-4 border border-gray-500">
          <input
            type="search"
            className="bg-transparent text-white font-roboto text-sm font-medium border-none outline-none flex-grow px-4 py-1"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="bg-transparent border-none"
            onClick={this.getJobDetails}
          >
            <BsSearch className="text-white text-xl" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="w-[400px]"
        />
        <h1 className="text-white font-roboto text-4xl font-bold mt-4">No Jobs Found</h1>
        <p className="text-white font-roboto text-lg mt-2">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="flex flex-col justify-center items-center w-full">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-[400px]"
      />
      <h1 className="text-white font-roboto text-4xl font-bold mt-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-white font-roboto text-xl mt-2">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="bg-indigo-600 border-none w-[150px] py-3 text-white font-roboto text-base font-normal mt-4 rounded-md"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  );

  renderLoadingView = () => (
    <div className="flex justify-center items-center w-full h-[50vh]" data-testid="loader">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </div>
  );

  renderJobProfileDetailsList = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="p-4 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="w-full md:w-3/4 flex justify-center">
          <div className="w-full max-w-4xl">
            {this.renderJobProfileDetailsList()}
          </div>
        </div>
      </div>
    );
  }
}

export default JobProfileSection;