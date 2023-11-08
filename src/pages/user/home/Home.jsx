
import { useDispatch } from "react-redux"
import { userLogout } from "../../../redux/slices/UserSlice"
const Home=()=>{
 
    const dispatch=useDispatch() 
    const handleClick=()=>{
      
         dispatch(userLogout())
     
    }

    return(

        <div>
            <h1>iam home </h1>
            <button onClick={handleClick}  type="submit">logout</button>
        </div>
    )
}

export default Home