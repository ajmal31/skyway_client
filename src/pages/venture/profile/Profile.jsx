import VentureProfile from "../../../components/venture/profile/Profile.jsx"
// import Sidebar from "../../../components/venture/sidebar/sidebar.jsx"
import Sidebar from "../../../components/venture/sidebar/Sidebar"
const Profile=()=>{


    return(
        <div className="h-screen w-screen p-8 flex  gap-8 bg-primary"  >

        {/* <h1 className="text-white ">Dahsbord of the venture</h1> */}
        
                    <div className="h-full w-2/12 shadow-2xl shadow-black">
        
                        <Sidebar/>
                    </div>
        
                    <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">
        
                     {/* <h1 className="text-white font-Outfit text-xl">USERS</h1> */}
                       
                         <VentureProfile/>
                          
                    </div>
                </div>
    )

}

export default Profile