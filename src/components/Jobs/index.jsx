import Header from '../Header';
import JobProfileSection from '../JobProfileSection';

const Jobs = () => (
  <>
    <Header />
    <div className="bg-black flex justify-around p-6">
      <JobProfileSection />
    </div>
  </>
);

export default Jobs;