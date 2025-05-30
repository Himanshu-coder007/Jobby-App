import { useNavigate, Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

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

  // Base classes for all nav items
  const baseNavItemClasses = "font-medium text-lg transition-colors px-4 py-2"
  
  // Classes for active and inactive states
  const activeClasses = "text-blue-400"
  const inactiveClasses = "text-white hover:text-blue-300"

  return (
    <nav className="bg-gray-800 flex items-center justify-between p-4">
      <div className="ml-24">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="h-10 w-36 mt-2"
          />
        </Link>
      </div>
      <ul className="flex justify-center mr-32">
        <li>
          <Link 
            to="/" 
            className={`${baseNavItemClasses} ${isActive('/') ? activeClasses : inactiveClasses}`}
          >
            Home
          </Link>
        </li>
        <li className="ml-10">
          <Link 
            to="/jobs" 
            className={`${baseNavItemClasses} ${isActive('/jobs') ? activeClasses : inactiveClasses}`}
          >
            Jobs
          </Link>
        </li>
      </ul>
      <div className="mr-14">
        <button
          type="button"
          onClick={onClickLogout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header