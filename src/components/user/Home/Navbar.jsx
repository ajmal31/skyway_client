import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_SRV_BASE_URL } from '../../../data/const';
import { fetchData } from '../../../redux/api/api';
import cookie from "js-cookie"
import { useSocket } from '../../../hooks/useSocket';



const Navbar = () => {
  const socket = useSocket()
  const [isOpen, setIsOpen] = useState(false);
  const { token, username } = useSelector((state) => state.UserSlice);
  const naviagte = useNavigate();
  const dispatch = useDispatch()
  const userId = cookie.get('userId')
  const userToken = useSelector((state = UserSlice) => state.UserSlice.token)
  const [unReadChats, setUnReadChats] = useState(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (route) => {
    naviagte(route);
    setIsOpen(false);
  };

  const renderAuthLinks = () => {
    return token ? (
      <Link to="/userProfile">Hi, {username}&nbsp;&nbsp;</Link>
    ) : (
      <Link to="/userLogin">Login&nbsp;&nbsp;</Link>
    );
  };

  const menuItems = [
    { label: 'Chats', route: '/chats' },
    { label: 'Ventures', route: '/ventureList' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  const renderMenuItem = (item, index) => (
    <span
      key={index}
      className="mr-8 cursor-pointer ml-2 flex "

      onClick={() => handleNavigation(item.route)}
    >

      <p className='duration-300 hover:text-gray-300  inline-block transition' onMouseOver={(e) => (e.target.style.borderBottomColor = 'gray')}
        onMouseOut={(e) => (e.target.style.borderBottomColor = 'transparent')} style={{ borderBottom: '2px solid transparent' }}
      > {item.label} {item.label === "Chats" && unReadChats !== 0 ? unReadChats : ''} </p>

    </span>
  );

  const unReadChatCount = async () => {
    const apiDetails = {
      method: 'post',
      url: CHAT_SRV_BASE_URL + "take/unRead/chat/count/user",
      data: { field: "userUnReadMessages", userId },
      token: true,
      to: "user"

    }
    const response = await dispatch(fetchData(apiDetails))
    setUnReadChats(response?.payload?.data)
  }
  
  socket&& socket.on('notification',()=>{
    unReadChatCount()
  })


  //take all user unreaded message count
  useEffect(() => {


    if (userId && userToken)
      unReadChatCount()

  }, [])
  const renderMobileMenu = (item, index) => (
    <div
      key={index}
      className="block px-3 py-2 rounded-md text-gray-300   hover:text-white hover:bg-gray-700"
      onClick={() => handleNavigation(item.route)}
    >
      {item.label}
    </div>
  );

  return (
    <header className="w-full bg-primary text-gray-100 font-Outfit px-10 shadow-sm fixed overflow-hidden ">
      <div className="container mx-auto flex justify-between items-center py-7 px-5">
        <Link to="/" className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0">
          {/* <svg xmlns="https://imgs.search.brave.com/3hjKUAltmBDIqxstJSPE0_CeM3jJTUUtt1nFHSyucOY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzU5LzYzLzQ4/LzM2MF9GXzE1OTYz/NDg0MF9GYTJIUGI4/SVRyYnI1Z2RkWTJl/S2xvbVZmc251MWd4/Ni5qcGc" className="w-10 h-10 text-white p-2 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg> */}
          <img src="/logos/skyway-logo-2.png" className='h-[50px] w-[70px]' alt="logo" />
          <span className="ml-3 text-2xl text-gray-100 font-medium antialiased">Skyway</span>
        </Link>
        <nav className="hidden md:ml-auto md:flex   flex-wrap items-center justify-center text-base tracking-wide">
          {menuItems.map(renderMenuItem)}
        </nav>
        {renderAuthLinks()}
        <div className="hidden sm:inline-flex ml-auto md:ml-0 mr-4 md:mr-0 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <button
          className="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-md text-gray-300 bg-gradient-to-br from-transparent to-transparent hover:text-white hover:from-pink-500 hover:to-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="w-full flex flex-col py-4 px-3 md:hidden bg-gray-900 text-base uppercase text-center font-semibold">
          {menuItems.map(renderMobileMenu)}
        </div>
      )}
    </header>
  );
};

export default Navbar;
