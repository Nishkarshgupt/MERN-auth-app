import React, { useState } from 'react'
import {Routes, Route, Router, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import RefreshHandler from './pages/RefreshHandler'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element:<Navigate to='/login' />
  }

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />}/>``
        <Route path='*' element={<Navigate to='/home' />}/>``
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App