
import { useDispatch } from "react-redux"
import { userLogout } from "../../../redux/slices/UserSlice"
import Navbar from "../../../components/user/Home/Navbar"
import Background from "../../../components/user/Home/Background"
// import YourComponent from "../../../components/user/Home/Test"
const Home=()=>{
 
    const dispatch=useDispatch() 
    const handleClick=()=>{
      
         dispatch(userLogout())
     
    }

    return(

        <div>

            {/* <YourComponent/> */}
            <Background/>
            {/* <h1>iam home </h1>
            <button onClick={handleClick}  type="submit">logout</button> */}
        </div>
    )
}

export default Home