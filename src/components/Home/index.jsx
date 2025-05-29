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
      {/* Hero Section */}
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
              className="bg-[#4f46e5] py-4 px-4 text-white font-medium w-[140px] border-none rounded-lg mt-9 text-base hover:bg-[#3c36b5] transition-colors"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-[#4f46e5] mb-4">10M+</h3>
              <p className="text-gray-600 text-lg">Active Job Seekers</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-[#4f46e5] mb-4">500K+</h3>
              <p className="text-gray-600 text-lg">Companies Hiring</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-[#4f46e5] mb-4">2M+</h3>
              <p className="text-gray-600 text-lg">Jobs Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="bg-gray-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Popular Job Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Software Development', jobs: '120K+ Jobs' },
              { name: 'Data Science', jobs: '85K+ Jobs' },
              { name: 'Digital Marketing', jobs: '65K+ Jobs' },
              { name: 'Healthcare', jobs: '150K+ Jobs' },
              { name: 'Finance', jobs: '95K+ Jobs' },
              { name: 'Design', jobs: '45K+ Jobs' },
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                <p className="text-gray-500">{category.jobs}</p>
                <Link to="/jobs" className="text-[#4f46e5] font-medium mt-4 inline-block hover:underline">
                  Browse Jobs →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Found my dream job within two weeks of using this platform! The interface is intuitive and job recommendations were spot on.",
                name: "Sarah Johnson",
                role: "Senior UX Designer at TechCorp"
              },
              {
                quote: "As a recruiter, I've been able to find quality candidates much faster than with other platforms. Highly recommended!",
                name: "Michael Chen",
                role: "Talent Acquisition at InnovateCo"
              },
              {
                quote: "The salary insights helped me negotiate a 20% higher offer than I expected. This service pays for itself!",
                name: "David Rodriguez",
                role: "Data Scientist at AnalyticsPro"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4f46e5] py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-white text-xl mb-8">
            Join millions of professionals who found their perfect job match with us.
          </p>
          <Link to="/jobs" className="no-underline">
            <button
              type="button"
              className="bg-white py-3 px-6 text-[#4f46e5] font-medium w-[180px] border-none rounded-lg text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home