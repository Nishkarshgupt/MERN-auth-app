import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Home = () => {
  const [logedInUser, setlogedInUser] = useState('')
  const [products, setProducts] = useState('')
  const usenavigate = useNavigate()
  useEffect(() => {
    setlogedInUser(localStorage.getItem('loggedInUser'))
    // console.log("running")
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess("Logged out successfully")
    setTimeout(() => {
      usenavigate('/login')
    }, 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = "https://mern-auth-app-api-omega.vercel.app/products"
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      setProducts(result)
      // console.log(result)

    } catch (err) {
      handleError(err)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='h-screen w-full  text-black flex items-center bg-amber-600 justify-center flex-col'>
      <h1 className='text-3xl font-bold text-black'>Hello {logedInUser}</h1>
      <button onClick={handleLogout} className='p-4 mt-4 bg-purple-600 text-white py-2 text-xl rounded-lg active:scale-95 hover:bg-purple-700 transition duration-300'>Logout</button>

      <div>
        {products && products?.map((item, index) => (
          <ul key={index}>
            <span>{item.name} : {item.price}</span>
          </ul>
        ))}
      </div> 
      <ToastContainer />
    </div>

  )
}

export default Home
