import { useState } from 'react'
import {Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/signupPage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const isLoggedIn=false;


  return (
  


 <div className=''>
  <Navbar/>
  <Routes>
    <Route path='/' element={isLoggedIn?<HomePage/>:<LoginPage/>}/>
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignupPage/>} />
  </Routes>
 </div>
  )
}

export default App
