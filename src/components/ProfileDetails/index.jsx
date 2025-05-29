import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

class ProfileDetails extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getProfileDetails();
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const jwtToken = Cookies.get('jwt_token');
    const url = 'https://apis.ccbp.in/profile';
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
        const profileData = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        };
        this.setState({
          profileList: profileData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderProfileDetails = () => {
    const { profileList } = this.state;
    const { name, profileImageUrl, shortBio } = profileList;

    return (
      <div 
        className="bg-[url('https://assets.ccbp.in/frontend/react-js/profile-bg.png')] bg-cover w-[300px] self-start rounded-xl p-5 mb-6"
      >
        <img 
          src={profileImageUrl} 
          alt="profile" 
          className="w-[50px]" 
        />
        <h1 className="text-indigo-500 text-xl font-roboto font-extrabold mt-4">
          {name}
        </h1>
        <p className="text-slate-600 text-base font-roboto mt-4 leading-relaxed">
          {shortBio}
        </p>
      </div>
    );
  };

  renderLoadingView = () => (
    <div 
      className="flex justify-center items-center mt-[200px]" 
      data-testid="loader"
    >
      <ThreeDots 
        height="50" 
        width="50" 
        radius="9"
        color="#ffffff" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );

  renderFailureView = () => (
    <div className="flex justify-center items-center mt-[200px]">
      <button
        type="button"
        className="bg-indigo-500 px-4 py-3 w-[110px] border-none text-white font-roboto font-medium rounded-md"
        onClick={this.getProfileDetails}
        data-testid="button"
      >
        Retry
      </button>
    </div>
  );

  render() {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  }
}

export default ProfileDetails;