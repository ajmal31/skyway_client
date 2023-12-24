import Sidebar from "../../../components/common/Sidebar"
import VentureDetail from "../../../components/admin/ventureDetails/ventureDetail"
import { useParams } from "react-router-dom"

const ventureDetails=()=>{

    const {ventureId}=useParams()
    
    return (


        <div className="bg-admin-primary p-7 flex gap-5 h-screen w-screen">

            <Sidebar />
            <VentureDetail vid={ventureId} />
        </div>


    )

}

export default ventureDetails