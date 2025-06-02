import { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';
import { BsSearch, BsFilterLeft } from 'react-icons/bs';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie';
import JobCard from '../JobCard';
import JobsFilterGroup from '../JobsFilterGroup';

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    icon: '🕒'
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    icon: '⏱️'
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    icon: '🖋️'
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    icon: '🎓'
  },
];

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    icon: '💰'
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    icon: '💵'
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    icon: '🪙'
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    icon: '💎'
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
    salaryRange: '',
    appliedEmploymentType: [],
    appliedSalaryRange: '',
    apiStatus: apiStatusConstants.initial,
    showMobileFilters: false
  };

  componentDidMount() {
    this.getJobDetails();
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const jwtToken = Cookies.get('jwt_token');
    const { appliedEmploymentType, appliedSalaryRange, searchInput } = this.state;
    const url = `https://apis.ccbp.in/jobs?employment_type=${appliedEmploymentType.join()}&minimum_package=${appliedSalaryRange}&search=${searchInput}`;
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
    this.setState({ salaryRange: salary });
  };

  changeEmploymentType = (type, isChecked) => {
    this.setState(prev => {
      const updatedEmploymentTypes = isChecked
        ? [...prev.employmentType, type]
        : prev.employmentType.filter(t => t !== type);
      
      return { employmentType: updatedEmploymentTypes };
    });
  };

  handleApplyFilters = () => {
    this.setState(prev => ({
      appliedEmploymentType: [...prev.employmentType],
      appliedSalaryRange: prev.salaryRange,
      showMobileFilters: false
    }), this.getJobDetails);
  };

  handleResetFilters = () => {
    this.setState({
      employmentType: [],
      salaryRange: '',
      appliedEmploymentType: [],
      appliedSalaryRange: '',
      showMobileFilters: false
    }, this.getJobDetails);
  };

  toggleMobileFilters = () => {
    this.setState(prev => ({ showMobileFilters: !prev.showMobileFilters }));
  };

  renderJobDetails = () => {
    const { jobsList, searchInput } = this.state;
    const jobsDisplay = jobsList.length > 0;

    return (
      <div className="w-full h-full">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex w-full max-w-[600px] bg-gray-800 rounded-lg p-3 my-6 border border-gray-700 shadow-lg"
        >
          <input
            type="search"
            className="bg-transparent text-white font-medium border-none outline-none flex-grow px-4 placeholder-gray-400"
            placeholder="Search by company, role..."
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
            onClick={this.getJobDetails}
          >
            <BsSearch className="text-white text-xl" />
          </button>
        </motion.div>
        
        {/* Mobile Filter Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={this.toggleMobileFilters}
          className="md:hidden flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg mb-6"
        >
          <BsFilterLeft className="text-xl" />
          Filters
        </motion.button>

        {/* Jobs List */}
        {jobsDisplay ? (
          <motion.ul 
            initial="hidden"
            animate="show"
            className="list-none flex flex-col w-full items-center gap-6"
          >
            <AnimatePresence>
              {jobsList.map((eachData, index) => (
                <motion.li
                  key={eachData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="w-full"
                >
                  <JobCard jobDetails={eachData} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center w-full py-12"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="w-[300px] md:w-[400px]"
            />
            <h1 className="text-white text-2xl md:text-3xl font-bold mt-6 text-center">
              No Jobs Found
            </h1>
            <p className="text-gray-400 text-lg mt-2 text-center max-w-md">
              We couldn't find any jobs matching your criteria. Try adjusting your filters.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleResetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-6 transition-colors"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  };

  renderFailureView = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center items-center w-full py-12"
    >
      <div className="relative">
        <FiAlertCircle className="text-red-500 text-6xl" />
        <div className="absolute inset-0 bg-red-500 rounded-full opacity-10 animate-ping"></div>
      </div>
      <h1 className="text-white text-2xl md:text-3xl font-bold mt-6 text-center">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-400 text-lg mt-2 text-center max-w-md">
        We're having trouble loading jobs. Please try again.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={this.getJobDetails}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-6 transition-colors"
      >
        <FiRefreshCw />
        Retry
      </motion.button>
    </motion.div>
  );

  renderLoadingView = () => (
    <div className="flex flex-col w-full gap-6 py-6">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="w-full bg-gray-800 rounded-xl p-6 h-40 animate-pulse"
        />
      ))}
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
    const { employmentType, salaryRange, showMobileFilters } = this.state;

    return (
      <div className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-150px)] bg-gray-900">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Desktop Filters */}
          <div className="hidden md:block w-full md:w-1/4">
            <JobsFilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              selectedEmploymentTypes={employmentType}
              selectedSalaryRange={salaryRange}
              onApplyFilters={this.handleApplyFilters}
              onResetFilters={this.handleResetFilters}
            />
          </div>

          {/* Mobile Filters Overlay */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 z-50 md:hidden"
                onClick={this.toggleMobileFilters}
              >
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="w-4/5 h-full bg-gray-800 p-6 overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button 
                      onClick={this.toggleMobileFilters}
                      className="text-gray-400 hover:text-white"
                    >
                      <IoMdClose className="text-2xl" />
                    </button>
                  </div>
                  <JobsFilterGroup
                    employmentTypesList={employmentTypesList}
                    salaryRangesList={salaryRangesList}
                    changeEmploymentType={this.changeEmploymentType}
                    changeSalaryRange={this.changeSalaryRange}
                    selectedEmploymentTypes={employmentType}
                    selectedSalaryRange={salaryRange}
                    onApplyFilters={this.handleApplyFilters}
                    onResetFilters={this.handleResetFilters}
                    isMobile
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {this.renderJobProfileDetailsList()}
          </div>
        </div>
      </div>
    );
  }
}

export default JobProfileSection;