import Sidebar from "../../../components/venture/sidebar/Sidebar"
import ShowingUserDetails from "../../../components/venture/userDetails/UserDetails"

const UserDetails=()=>{

    
    return(
        <div className="h-screen w-screen p-8 flex  gap-8 bg-primary  "  >

        {/* <h1 className="text-white ">Dahsbord of the venture</h1> */}
        
                    <div className="h-full w-2/12 shadow-2xl shadow-black">
        
                        <Sidebar/>
                    </div>
        
                    <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">
        
                     {/* <h1 className="text-white font-Outfit text-xl">USERS</h1> */}
                       
                         <ShowingUserDetails/>
                          
                    </div>
                </div>
    )



}

export default UserDetails