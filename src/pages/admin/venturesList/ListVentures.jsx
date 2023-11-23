import Admincontent from "../../../components/common/AdminContent"
import Sidebar from "../../../components/common/Sidebar"


const VenturesList = () => {

    return (

        <div className="bg-admin-primary gap-5 p-7 flex w-screen h-screen" >


                 <Sidebar/>
                 <Admincontent content={'ventures'}/>

        </div>
    )

}

export default VenturesList