
//import pages here
import React from "react"
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import UserLogin from "./pages/user/login/UserLogin"
import UserRegister from "./pages/user/register/UserRegister"
import { getToken } from "./redux/api/api"
import Home from "./pages/user/home/Home"
const token=getToken()

function App() {

      


 return(
 
  <Router>
  
  <Routes>

        <Route  path="/userlogin" element={<UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/home' element={(token?<Home/>:<UserLogin/>)}/>
        


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
