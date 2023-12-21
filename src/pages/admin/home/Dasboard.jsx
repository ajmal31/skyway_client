import Sidebar from "../../../components/common/Sidebar"
import Dashboard from "../../../components/admin/dashboard/Dashboard"
const AdminHome = () => {


    return (

        <div className="bg-admin-primary p-7 flex gap-5 h-screen w-screen">

            <Sidebar />
            <Dashboard/>

        </div>

    )



}

export default AdminHome