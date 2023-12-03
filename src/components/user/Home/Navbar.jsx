import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import UserSlice from '../../../redux/slices/UserSlice'

const Navbar=()=>{

    const [isOpen, setIsOpen] = useState(false)
     
     const {token,username}=useSelector((state=UserSlice)=>state.UserSlice)
     

    return(

    <header className="w-full bg-primary text-gray-100  font-Outfit px-10 shadow-sm   ">


      {/* :DESKTOP MENU */}
      <div className="container mx-auto flex justify-between items-center py-7 px-5">
        {/* Site logo and Name */}
        <a href="#link" className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white p-2 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
          <svg xmlns="https://imgs.search.brave.com/3hjKUAltmBDIqxstJSPE0_CeM3jJTUUtt1nFHSyucOY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzU5LzYzLzQ4/LzM2MF9GXzE1OTYz/NDg0MF9GYTJIUGI4/SVRyYnI1Z2RkWTJl/S2xvbVZmc251MWd4/Ni5qcGc" className="w-10 h-10 text-white p-2 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
         <Link to={'/'}> <span className="ml-3 text-2xl text-gray-100 font-medium antialiased">Skyway</span></Link>
        </a  >
        {/* Navbar */}
        <nav className="hidden md:ml-auto md:flex flex-wrap items-center justify-center text-base tracking-wide  ">
          
          <Link to={'/chats'} className="mr-8 hover:text-gray-300">chats</Link>
          <Link to={'/ventureList'} className="mr-8 hover:text-gray-300">Ventures</Link>
          <a href="#link" className="mr-8 hover:text-gray-300">About</a>
          <a href="#link" className="mr-8 hover:text-gray-300">Contact</a>
        </nav>
        {/* Avatar */}
        {/* <button onClick={dispatch(userLogout)}}>Hi,Ajmal&nbsp;&nbsp;</button> */}
        {token?( <Link to={'/userProfile'} >Hi,{username}&nbsp;&nbsp;</Link>):( <Link to={'/userLogin'} >Login&nbsp;&nbsp;</Link>)
        
      }
      
        
        <div className="hidden sm:inline-flex ml-auto md:ml-0 mr-4 md:mr-0 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
        </div>
        {/* Burger icon standard */}
        <button 
          className="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-md text-gray-300 bg-gradient-to-br from-transparent to-transparent hover:text-white hover:from-pink-500 hover:to-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* :MOBILE MENU */}
      { isOpen &&
        <div className="w-full flex flex-col py-4 px-3 md:hidden bg-gray-900 text-base uppercase text-center font-semibold">
          <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">Solutions</a>
          <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">Prices</a>
          <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">About</a>
          <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">Contact</a>
        </div>
      }
      
    </header>
  )
}


export default Navbar