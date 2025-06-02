import { useNavigate, Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { FiHome, FiBriefcase, FiLogOut } from 'react-icons/fi'
import { FaProductHunt } from 'react-icons/fa'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  // Base classes for all nav items
  const baseNavItemClasses = "flex items-center font-medium text-lg transition-all px-4 py-2 rounded-lg"
  
  // Classes for active and inactive states
  const activeClasses = "text-white bg-blue-600 shadow-lg"
  const inactiveClasses = "text-gray-300 hover:text-white hover:bg-gray-700"

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gray-900 flex items-center justify-between p-4 border-b border-gray-800 shadow-sm"
    >
      <motion.div variants={itemVariants} className="ml-8">
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
           
            <span className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text ">
              Job App
            </span>
          </motion.div>
        </Link>
      </motion.div>

      <motion.ul 
        variants={containerVariants}
        className="flex justify-center mr-8"
      >
        <motion.li variants={itemVariants}>
          <Link 
            to="/" 
            className={`${baseNavItemClasses} ${isActive('/') ? activeClasses : inactiveClasses}`}
          >
            <FiHome className="mr-2" />
            Home
          </Link>
        </motion.li>
        <motion.li variants={itemVariants} className="ml-6">
          <Link 
            to="/jobs" 
            className={`${baseNavItemClasses} ${isActive('/jobs') ? activeClasses : inactiveClasses}`}
          >
            <FiBriefcase className="mr-2" />
            Jobs
          </Link>
        </motion.li>
      </motion.ul>

      <motion.div variants={itemVariants} className="mr-8">
        <motion.button
          type="button"
          onClick={onClickLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md"
        >
          <FiLogOut className="mr-2" />
          Logout
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}

export default Header