
//import pages here

//React Related imports
import React,{useState,useEffect, Suspense,lazy} from "react"
import { BrowserRouter as Router ,Routes,Route,useLocation,Navigate } from "react-router-dom"
import cookie from "js-cookie"
import {useDispatch} from "react-redux"



//User related imports
import UserLogin from "./pages/user/login/UserLogin"
import UserRegister from "./pages/user/register/UserRegister"
import Home from "./pages/user/home/Home"
import UserSlice from "./redux/slices/UserSlice"
import { useSelector } from "react-redux"
import Profile from "./pages/user/profile/Profile"
import VentureList from "./pages/user/ventures/ventureList"
import VentureDetails from "./pages/user/ventureDetails/VentureDetails"
import { userLogout } from "./redux/slices/UserSlice"




//Venture related imports

import VentureRegister from "./pages/venture/register/VentureRegister"
import VentureLogin from "./pages/venture/Login/VentureLogin"
import VentureDashbord from "./pages/venture/dashbord/VentureDashbord"
import ventureSlices from "./redux/slices/ventureSlices"
import { ventureLogout } from "./redux/slices/ventureSlices"
import Users from "./pages/venture/users/Users"
import UserDetails from "./pages/venture/userDetails/UserDetails"


//Admin Related imports
import AdminLogin from "./pages/admin/Login/AdminLogin"
import adminSlice from "./redux/slices/adminSlice"
import UsersList from "./pages/admin/usersList/UsersList"
import AdminHome from "./pages/admin/home/Dasboard"
import ListVentures from "./pages/admin/venturesList/ListVentures"  
import Dashboard from "./components/admin/dashboard/Dashboard"    
import AventureDetails from "./pages/admin/ventureDetails/ventureDetails"


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
        <Route  path="/userLogin" element={userToken&&userId? <h1>sorry you are logged in</h1>: <UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/' element={(<Home/>)}/>
        <Route path='/userProfile' element={userToken&&userId?<Profile/>:<Navigate to={'/userLogin'} />}/>
        <Route path="/ventureList" element={<VentureList/>}/>
        <Route path="/ventureDetails/:id" element={<VentureDetails/>}/>
        <Route path="/chats" element={userToken&&userId? <Suspense ><Chat/></Suspense> :<Navigate to={'/userlogin'}/>} />
        {/* <Route path="/otp" element={<Otp/>}/> */}


         {/* venture Routes */}
         <Route path="/venture/register" element={ventureToken&&ventureId?<Navigate to={"/venture/dashboard"}/>:<VentureRegister/>}/>
         <Route path="/venture/login" element={ventureToken&&ventureId?<Navigate to={"/venture/dashboard"}/>:<VentureLogin/>}/>
         <Route path="/venture/dashboard" element={ ventureStatus==="pending"? <Navigate to={'/venture/pending'}/>:ventureStatus==="allowed" && ventureToken&&ventureId?<VentureDashbord/>:<Navigate to={'/venture/login'} />}/>
         <Route path="/venture/pending" element={ventureStatus==="pending"?<h1> Your venture Registration  process is going on..be patient pleasse wait for the confirmation</h1>:<Navigate to={'/venture/dashboard'} />}/>
         <Route path="/venture/chats" element={ventureId&&ventureToken? <Suspense ><Chat roll={"venture"} /></Suspense> :<Navigate to={'/venture/login'} />}/>
         <Route path="/venture/users" element={ventureId&&ventureToken ? <Users/>:<VentureLogin/>}/>
         <Route path="/venture/userDetails/:userId" element={ventureId&&ventureToken ? <UserDetails/>:<VentureLogin/>}/>
        
         
   
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
