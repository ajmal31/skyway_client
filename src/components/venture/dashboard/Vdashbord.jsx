import Sidebar from "../../user/common/Sidebar"
import Table from "../../user/common/Table"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
const VentureDashbord = () => {

    const apiDetails={
        method:'get',
        url:VENTURE_SRV_BASE_URL+'getAllUsers',
        data:null,
        token:false
    }

    return (
        <div className="h-screen w-screen p-8 flex  gap-8 bg-primary"  >



            <div className="h-full w-2/12 shadow-2xl shadow-black">

                <Sidebar api={apiDetails} />
            </div>

            <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">

             <h1 className="text-white font-Outfit text-xl">USERS</h1>
                <Table />

            </div>
        </div>
    )
}
export default VentureDashbord