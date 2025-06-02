import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiBriefcase, FiDollarSign, FiUsers, FiAward } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="relative bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] bg-cover bg-center h-screen flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40"></div>
        <div className="container mx-auto px-6 z-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.h1 
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Find The Job That <span className="text-blue-400">Fits</span> Your Life
            </motion.h1>
            <motion.p 
              variants={item}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed"
            >
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </motion.p>
            <motion.div variants={item}>
              <Link to="/jobs" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg"
                >
                  Find Jobs <FiArrowRight className="text-lg" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={item} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We connect top talent with world-class companies through our innovative platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiUsers className="text-4xl" />, value: "10M+", label: "Active Job Seekers" },
              { icon: <FiBriefcase className="text-4xl" />, value: "500K+", label: "Companies Hiring" },
              { icon: <FiAward className="text-4xl" />, value: "2M+", label: "Jobs Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
              >
                <div className="text-blue-500 mb-6 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Job Categories */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={item} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Job Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore opportunities in the most in-demand fields
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Software Development', jobs: '120K+ Jobs', icon: '💻' },
              { name: 'Data Science', jobs: '85K+ Jobs', icon: '📊' },
              { name: 'Digital Marketing', jobs: '65K+ Jobs', icon: '📈' },
              { name: 'Healthcare', jobs: '150K+ Jobs', icon: '🏥' },
              { name: 'Finance', jobs: '95K+ Jobs', icon: '💰' },
              { name: 'Design', jobs: '45K+ Jobs', icon: '🎨' },
            ].map((category, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{category.name}</h3>
                    <p className="text-gray-500">{category.jobs}</p>
                  </div>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <Link 
                  to="/jobs" 
                  className="text-blue-600 font-medium mt-6 inline-flex items-center gap-1 hover:underline group"
                >
                  Browse Jobs 
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={item} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Don't just take our word for it - hear from our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Found my dream job within two weeks of using this platform! The interface is intuitive and job recommendations were spot on.",
                name: "Sarah Johnson",
                role: "Senior UX Designer at TechCorp",
                rating: 5
              },
              {
                quote: "As a recruiter, I've been able to find quality candidates much faster than with other platforms. Highly recommended!",
                name: "Michael Chen",
                role: "Talent Acquisition at InnovateCo",
                rating: 5
              },
              {
                quote: "The salary insights helped me negotiate a 20% higher offer than I expected. This service pays for itself!",
                name: "David Rodriguez",
                role: "Data Scientist at AnalyticsPro",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="text-yellow-400 mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
                <FaQuoteLeft className="text-gray-300 text-2xl mb-4" />
                <p className="text-gray-600 mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={item}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take the Next Step in Your Career?</h2>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Join millions of professionals who found their perfect job match with us.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/jobs" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white py-3 px-8 text-blue-600 font-medium rounded-lg text-lg hover:bg-gray-50 transition-all shadow-lg flex items-center gap-2"
                >
                  Get Started Now <FiArrowRight />
                </motion.button>
              </Link>
              <Link to="/jobs" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white py-3 px-8 text-white font-medium rounded-lg text-lg hover:bg-white/10 transition-all shadow-lg"
                >
                  Browse Jobs
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}

export default Home