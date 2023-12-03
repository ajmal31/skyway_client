
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
import VentureList from "./pages/user/ventures/ventureList"
import VentureDetails from "./pages/user/ventureDetails/VentureDetails"


//Venture related imports

import VentureRegister from "./pages/venture/register/VentureRegister"
import VentureLogin from "./pages/venture/Login/VentureLogin"
import VentureDashbord from "./pages/venture/dashbord/VentureDashbord"
import ventureSlices from "./redux/slices/ventureSlices"


//Admin Related imports
import AdminLogin from "./pages/admin/Login/AdminLogin"
import adminSlice from "./redux/slices/adminSlice"
import UsersList from "./pages/admin/usersList/UsersList"
import AdminHome from "./pages/admin/home/Home"
import ListVentures from "./pages/admin/venturesList/ListVentures"      


// Chat Related Imports
import Chat from "./pages/chat/Chat"


function App() {
      //user Essential creds
      const userToken=useSelector((state=UserSlice)=>state.UserSlice.token)
      //venture Essential creds
      const ventureToken=useSelector((state=ventureSlices)=>state.ventureSlices.ventureToken)
      const ventureStatus=useSelector((state=ventureSlices)=>state.ventureSlices.pending)
      console.log('in app .js status od the venture',ventureStatus,'ventures token',ventureToken)
      
      //admin Essential creds
      const adminToken=useSelector((state=adminSlice)=>state.adminSlice.token)
      console.log('hei here we go with admin tokne',adminToken)
      


 return(
 
  <Router>
  
  <Routes>
       {/* User Routes */}
        <Route  path="/userLogin" element={userToken? <h1>sorry you are logged in</h1>: <UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/' element={(<Home/>)}/>
        <Route path='/userProfile' element={userToken?<Profile/>:<Navigate to={'/userLogin'} />}/>
        <Route path="/ventureList" element={<VentureList/>}/>
        <Route path="/ventureDetails/:id" element={<VentureDetails/>}/>


         {/* venture Routes */}
         <Route path="/venture/register" element={ventureToken?<Navigate to={"/venture/dashboard"}/>:<VentureRegister/>}/>
         <Route path="/venture/login" element={ventureToken?<Navigate to={"/venture/dashboard"}/>:<VentureLogin/>}/>
         <Route path="/venture/dashboard" element={ ventureStatus==="true"? <Navigate to={'/venture/pending'}/>:ventureStatus==="false"?<VentureDashbord/>:<Navigate to={'/venture/login'} />}/>
         <Route path="/venture/pending" element={ventureStatus==="true"?<h1> Your venture Registration  process is going on..be patient pleasse wait for the confirmation</h1>:<Navigate to={'/venture/dashboard'} />}/>
      
         
   
        {/* Admin Routes */}
        <Route path="/admin/login" element={!adminToken?(<AdminLogin/>):<Navigate to={'/admin'}/>}/>
        <Route path="/admin/users" element={adminToken?<UsersList/>:<Navigate to={'/admin/login'}/>}/>
        <Route path="/admin/" element={adminToken?<AdminHome/>:<Navigate to={'/admin/login'} />}/>
        <Route path="/admin/ventures" element={adminToken?<ListVentures/>:<Navigate to={'/admin/login'} />}/>


        {/* chat Routes */}
        <Route path="/chats" element={<Chat/>} />


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
