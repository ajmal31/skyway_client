
//import pages here

//React Related imports
import React,{useState,useEffect, Suspense,lazy} from "react"
import { BrowserRouter as Router ,Routes,Route,useLocation,Navigate } from "react-router-dom"
import cookie from "js-cookie"
import {useDispatch} from "react-redux"



//User related imports
import UserLogin from "./pages/user/login/UserLogin.jsx"
import UserRegister from "./pages/user/register/UserRegister.jsx"
import Home from "./pages/user/home/Home.jsx"
import UserSlice from "./redux/slices/UserSlice.js"
import { useSelector } from "react-redux"
import Profile from "./pages/user/profile/Profile.jsx"
// import VentureList from "./pages/user/ventures/ventureList"
import VentureList from "./pages/user/ventures/VentureList.jsx"
import VentureDetails from "./pages/user/ventureDetails/VentureDetails.jsx"
import { userLogout } from "./redux/slices/UserSlice.js"
import About from "./pages/user/About/About.jsx"
import Contact from "./pages/user/contact/contact.jsx"




//Venture related imports

import VentureRegister from "./pages/venture/register/VentureRegister.jsx"
import VentureLogin from "./pages/venture/Login/VentureLogin.jsx"
import VentureDashbord from "./pages/venture/dashbord/VentureDashbord.jsx"
import ventureSlices from "./redux/slices/ventureSlices.js"
import { ventureLogout } from "./redux/slices/ventureSlices.js"
import Users from "./pages/venture/users/Users.jsx"
import UserDetails from "./pages/venture/userDetails/UserDetails.jsx"
import VentureProfile from "./pages/venture/profile/Profile.jsx"
import PendingVenture from "./pages/venture/pending-venture/PendingVenture.jsx"
import VentureFeedbacks from "./pages/venture/venture-feedbacks/VentureFeedbacks.jsx"


//Admin Related imports
import AdminLogin from "./pages/admin/Login/AdminLogin.jsx"
import adminSlice from "./redux/slices/adminSlice.js"
import UsersList from "./pages/admin/usersList/UsersList.jsx"
import AdminHome from "./pages/admin/home/Dasboard"
import ListVentures from "./pages/admin/venturesList/ListVentures.jsx"  
// import Dashboard from "./components/admin/dashboard/Dashboard"    
import AventureDetails from "./pages/admin/ventureDetails/VentureDetails.jsx"


// Chat Related Imports
const Chat=lazy(()=>import('../src/pages/chat/Chat'))



function App() {

      const dispatch=useDispatch()

      //user Essential creds
      const userToken=useSelector((state=UserSlice)=>state.UserSlice.token)
      const userId=cookie.get('userId')
      //venture Essential creds
      const ventureToken=useSelector((state=ventureSlices)=>state.ventureSlices.ventureToken)
      const ventureStatus=useSelector((state=ventureSlices)=>state.ventureSlices.admin_allowed)
      const ventureId=cookie.get('ventureId')      
      //admin Essential creds
      const adminToken=useSelector((state=adminSlice)=>state.adminSlice.token)

      
      useEffect(()=>{
        //venture    
        if(!ventureId)dispatch(ventureLogout())
        if(!ventureToken)cookie.remove("ventureId")

        //user
        if(!userId)dispatch(userLogout())
        if(!userToken)cookie.remove('userId')

      },[])

      
      

 return(
 
  <Router>
  
  <Routes>
       {/* User Routes */}
        <Route  path="/userLogin" element={userToken&&userId?<Navigate to={'/'} /> : <UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/' element={(<Home/>)}/>
        <Route path='/userProfile' element={userToken&&userId?<Profile/>:<Navigate to={'/userLogin'} />}/>
        <Route path="/ventureList" element={<VentureList/>}/>
        <Route path="/ventureDetails/:id" element={<VentureDetails/>}/>
        <Route path="/chats" element={userToken&&userId? <Suspense ><Chat/></Suspense> :<Navigate to={'/userlogin'}/>} />
        <Route path="/ventureList/:country" element={<VentureList/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* <Route path="/otp" element={<Otp/>}/> */}


         {/* venture Routes */}
         <Route path="/venture/register" element={ventureToken&&ventureId?<Navigate to={"/venture/dashboard"}/>:<VentureRegister/>}/>
         <Route path="/venture/login" element={ventureToken&&ventureId?<Navigate to={"/venture/dashboard"}/>:<VentureLogin/>}/>
         <Route path="/venture/dashboard" element={ ventureStatus==="pending"? <Navigate to={'/venture/pending'}/>:ventureStatus==="allowed" && ventureToken&&ventureId?<VentureDashbord/>:<Navigate to={'/venture/login'} />}/>
         <Route path="/venture/pending" element={ventureStatus==="pending"?<PendingVenture/>:<Navigate to={'/venture/dashboard'} />}/>
         <Route path="/venture/chats" element={ventureId&&ventureToken? <Suspense ><Chat roll={"venture"} /></Suspense> :<Navigate to={'/venture/login'} />}/>
         <Route path="/venture/users" element={ventureId&&ventureToken ? <Users/>:<VentureLogin/>}/>
         <Route path="/venture/userDetails/:userId" element={ventureId&&ventureToken ? <UserDetails/>:<VentureLogin/>}/>
         <Route path="/venture/profile" element={ventureId&&ventureToken ? <VentureProfile/>:<VentureLogin/>}/>
         <Route path="/venture/feedbacks" element={ventureId&&ventureToken ? <VentureFeedbacks/>:<VentureLogin/>}/>
        
         
   
        {/* Admin Routes */}
        <Route path="/admin/login" element={!adminToken?(<AdminLogin/>):<Navigate to={'/admin'}/>}/>
        <Route path="/admin/users" element={adminToken?<UsersList/>:<Navigate to={'/admin/login'}/>}/>
        <Route path="/admin/" element={adminToken?<AdminHome/>:<Navigate to={'/admin/login'} />}/>
        <Route path="/admin/ventures" element={adminToken?<ListVentures/>:<Navigate to={'/admin/login'} />}/>
        <Route  path="/admin/ventureDetails/:ventureId" element={adminToken?<AventureDetails/>:<Navigate to={'/admin/login'} />} />


        {/* chat Routes for users */}
       




        


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
