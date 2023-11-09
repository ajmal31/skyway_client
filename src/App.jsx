
//import pages here
import React,{useState,useEffect} from "react"
import { BrowserRouter as Router ,Routes,Route,useLocation,Navigate } from "react-router-dom"
import UserLogin from "./pages/user/login/UserLogin"
import UserRegister from "./pages/user/register/UserRegister"
import Home from "./pages/user/home/Home"
import UserSlice from "./redux/slices/UserSlice"
import { useSelector } from "react-redux"


function App() {
      
      const token=useSelector((state=UserSlice)=>state.UserSlice.token)

 return(
 
  <Router>
  
  <Routes>

        <Route  path="/userLogin" element={token? <h1>sorry you are logged in</h1>: <UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/' element={(<Home/>)}/>
        


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
