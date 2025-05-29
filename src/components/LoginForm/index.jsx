import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    window.location.replace('/')
  }

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gray-800 flex flex-col items-center p-16 rounded-xl">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="w-36 mb-6"
        />
        <form className="mt-8 w-full" onSubmit={onSubmitForm}>
          <div className="mb-6">
            <label className="block text-white text-sm font-normal mb-2" htmlFor="userName">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              className="w-full bg-transparent border border-indigo-400 rounded px-4 py-3 text-white outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-normal mb-2" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="w-full bg-transparent border border-indigo-400 rounded px-4 py-3 text-white outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-indigo-600 py-2 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
            type="submit"
          >
            Login
          </button>
          {showSubmitError && (
            <p className="text-red-500 text-xs mt-2">*{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm