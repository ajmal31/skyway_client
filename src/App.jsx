
//import pages here

//React Related imports
import React,{useState,useEffect} from "react"
import { BrowserRouter as Router ,Routes,Route,useLocation,Navigate } from "react-router-dom"


//User related imports
import UserLogin from "./pages/user/login/UserLogin"
import UserRegister from "./pages/user/register/UserRegister"
import Home from "./pages/user/home/Home"
import UserSlice from "./redux/slices/UserSlice"
import { useSelector } from "react-redux"
import Profile from "./pages/user/profile/Profile"


//Venture related imports

import VentureLogin from "./pages/venture/Login/VentureLogin"


function App() {
      
      const token=useSelector((state=UserSlice)=>state.UserSlice.token)

 return(
 
  <Router>
  
  <Routes>
       {/* User Routes */}
        <Route  path="/userLogin" element={token? <h1>sorry you are logged in</h1>: <UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/' element={(<Home/>)}/>
        <Route path='/userProfile' element={token?<Profile/>:<Navigate to={'/userLogin'} />}/>


        {/* Venture Routes */}
         <Route path="/venture" element={<h1>Venture side</h1>}/> 
         <Route path="/venture/login" element={<VentureLogin/>}/>


        {/* Admin Routes */}
        


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
