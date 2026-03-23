import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Login = () => {
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = loginInfo
    if (!email || !password) {
      handleError("email and password are required")
    }

    try {
      const url = "https://mern-auth-app-api-omega.vercel.app/auth/login"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json()
      // console.log(result)

      const { success, message, error, token, name } = result
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', token)
        localStorage.setItem('loggedInUser', name)

        setTimeout(() => {
          navigate('/home')
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message
        handleError(details);
      } else if (!success) {
        handleError(message)
      }

    } catch (err) {
      handleError(err)
    }
  }

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    const copyLoginInfo = { ...loginInfo }
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
    // console.log(loginInfo)
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>

      <form className='bg-white p-10 rounded-2xl shadow-2xl w-96' onSubmit={handleSubmit}>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-700'>
          Login
        </h2>

        {/* Email */}
        <div className='mb-5'>
          <label className='block text-gray-600 mb-1'>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={loginInfo.email}
            autoFocus
            placeholder='Enter your email'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Password */}
        <div className='mb-6'>
          <label className='block text-gray-600 mb-1'>Password</label>
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Button */}
        <button
          className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300'
        >
          Submit
        </button>

        {/* Extra */}
        <p className='text-sm text-center text-gray-500 mt-4'>
          Don't have an account? <span className='text-purple-600 cursor-pointer'> <Link to='/signup'>Sign Up</Link> </span>
        </p>

      </form>
      <ToastContainer />

    </div>
  )
}

export default Login
