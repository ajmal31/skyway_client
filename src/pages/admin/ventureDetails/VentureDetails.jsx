import Sidebar from "../../../components/common/Sidebar"
import VentureDetail from "../../../components/admin/ventureDetails/ventureDetail"

const ventureDetails=()=>{

    return (


        <div className="bg-admin-primary p-7 flex gap-5 h-screen w-screen">

            <Sidebar />
            <VentureDetail/>
        </div>


    )

}

export default ventureDetails