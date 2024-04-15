import React from 'react'
import Navbar from './components/header/Navbar'
import Footer from './components/footer/HomeFooter'
import { Outlet } from 'react-router-dom'


const HomeLayout = () => {
 
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  )
}

export default HomeLayout