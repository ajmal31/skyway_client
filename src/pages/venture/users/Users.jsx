import UsersTable from "../../../components/common/UsersTable"
import { USER_SRV_BASE_URL } from "../../../data/const"
import Sidebar from "../../../components/venture/sidebar/Sidebar"
const Users=()=>{

    const apiDetails={
        method:'get',
        url:USER_SRV_BASE_URL+'getAllConnectedUsers',
        data:null,
        token:true,
        to:"venture"
    }

    const data={
        roll:'venture',
        api:apiDetails

    }
    

    return(
        <div className="h-screen w-screen p-8 flex  gap-8 bg-primary"  >

        {/* <h1 className="text-white ">Dahsbord of the venture</h1> */}
        
                    <div className="h-full w-2/12 shadow-2xl shadow-black">
        
                        <Sidebar/>
                    </div>
        
                    <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">
        
                     {/* <h1 className="text-white font-Outfit text-xl">USERS</h1> */}
                       
                          <UsersTable content={data}  />
                          
                    </div>
                </div>
    )
}
export default Users