
//import pages here
import React from "react"
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import UserLogin from "./pages/user/login/UserLogin"
import UserRegister from "./pages/user/register/UserRegister"
import { getToken } from "./redux/api/api"



function App() {

      const test=getToken()
      console.log('token in router',test)

 return(
 
  <Router>
  
  <Routes>

        <Route  path="/userlogin" element={<UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>}/>
        <Route path='/home' element={(<h1>helo iam home</h1>)}/>
        


  </Routes>
  
  
  </Router>

 )
    
 
}

export default App
