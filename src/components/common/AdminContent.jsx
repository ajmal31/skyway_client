import UsersTable from "./UsersTable"
import VenturesTable from "./venturesTable"
import { ADMIN_SRV_BASE_URL, USER_SRV_BASE_URL } from "../../data/const"
const Admincontent = (prop) => {

        const apiDetails={
            method:'get',
            url:USER_SRV_BASE_URL+'getAllUsers',
            data:null,
            token:true,
            to:'admin'
        }
        const data={
            roll:'admin',
            api:apiDetails
    
        }

    return (

        <div className="bg-admin-secondory h-full flex justify-center items-start w-10/12 rounded-3xl  shadow-2xl">
            {prop?.content === 'ventures' ? (<VenturesTable />) :

                <UsersTable content={data} />
            }


        </div>
    )

}

export default Admincontent