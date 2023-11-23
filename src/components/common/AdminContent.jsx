import UsersTable from "./UsersTable"
import VenturesTable from "./venturesTable"
const Admincontent = (prop) => {


    return (

        <div className="bg-admin-secondory h-full flex justify-center items-start w-10/12 rounded-3xl  shadow-2xl">
            {prop?.content === 'ventures' ? (<VenturesTable />) :

                <UsersTable />
            }


        </div>
    )

}

export default Admincontent