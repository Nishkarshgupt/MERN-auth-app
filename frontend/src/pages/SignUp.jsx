import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


const SignUp = () => {

  const navigate = useNavigate()
  
  
  async function handleSubmit(e) {
    e.preventDefault()
    const { name, email, password } = signUpInfo
    if (!name || !email || !password) {
      return handleError('name, email and password are required')
    }

    try {
      const url = "https://mern-auth-app-api-omega.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpInfo)
      });
      const result = await response.json()
      const {success, message, error} = result
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
      }else if(error){
        const details = error?.details[0].message
        handleError(details);
      }else if(!success){
        handleError(message)
      }
      console.log(result)

    } catch (err) {
      handleError(err)
    }
  }

  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    console.log(name, value)
    const copySignUpInfo = { ...signUpInfo }
    copySignUpInfo[name] = value
    setSignUpInfo(copySignUpInfo)
    // console.log(signUpInfo)
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>

      <form className='bg-white p-10 rounded-2xl shadow-2xl w-96' onSubmit={handleSubmit}>

        <h2 className='text-3xl font-bold text-center mb-6 text-gray-700'>
          Sign Up
        </h2>

        {/* Name */}
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Full Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder='Enter your name'
            value={signUpInfo.name}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Email */}
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder='Enter your email'
            value={signUpInfo.email}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder='Enter your password'
            value={signUpInfo.password}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>

        {/* Button */}
        <button
          className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300'
        >
          Create Account
        </button>

        <p className='text-sm text-center text-gray-500 mt-4'>
          Already have an account?
          <span className='text-purple-600 cursor-pointer ml-1'>
            <Link to='/login'>Login</Link></span>
        </p>

      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp
