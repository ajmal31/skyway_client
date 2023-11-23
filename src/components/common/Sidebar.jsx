import { Link } from "react-router-dom"
const Sidebar = () => {

    return (

        <div className="bg-admin-secondory h-full w-2/12 rounded-3xl shadow-2xl">
            <div className="bg-admin-primary w-full h-1/5"></div>
            <div className="w-full h-4/5 flex flex-col  font-Outfit">
                {/* Sidebar Header */}
                <div className="flex items-start justify-center py-4">
                    <img src="/admin/system-solid-41-home.gif" alt="" className="h-7 w-57" />
                  <Link to={'/admin/'} > <span className="ml-2 ">Dashboard</span></Link> 
                </div>
                <div className="flex  justify-center ">
                    {/* <img src="/admin/system-solid-41-home.gif" alt="" className="h-10 w-10" /> */}
                  <Link to={'/admin/users'} ><span className="ml-2 ">Users</span></Link>  
                </div>
                <div className="flex justify-center ">
                    {/* <img src="/admin/system-solid-41-home.gif" alt="" className="h-10 w-10" /> */}
                  <Link to={'/admin/ventures'} ><span className="ml-2 ">ventures</span></Link>  
                </div>


            </div>
        </div>
    )
}

export default Sidebar