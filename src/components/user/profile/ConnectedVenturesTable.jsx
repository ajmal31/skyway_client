import { Link } from "react-router-dom"
const ConnectedVentureTable = ({ data }) => {
    console.log('data in table', data)
    const tableLabels = [
        { label: 'Venture Name ' },
        { label: 'Your status ' },
        { label: 'Service status ' },
        { label: 'Action ' },
        { label: 'Payment' },
    ]
    const tableData = [
        { ventureName: 'skyway', status: "allowed", service: "proccessing", action: "make a chat", lable: "make payment" },
        { ventureName: 'skyway', status: "allowed", service: "proccessing", action: "make a chat", lable: "make payment" },

    ]




    return (

        <div className="font-outfit  text-gray-400 mb-14 rounded-2xl bg-secondory  w-full">


            <table className="w-full my-2  ">

                <thead className=" border-b-4 border-gray-600 ">
                    <tr>
                        {tableLabels.map((val) => (
                            <>
                                <th>{val.label}</th>
                            </>

                        ))}

                    </tr>


                </thead>

                <br />
                <tbody className="  w-full" >

                    {data?.map((val) => (

                        <tr className=" ">
                            {console.log("val", val)}
                            <td className="p-3  text-center ">{val?.ventureName}</td>
                            <td className="p-3  text-center ">{val?.user_status}</td>
                            <td className="p-3  text-center ">{val?.service_started_by ?"started" : "Not started"}</td>
                            <td className="p-3  text-center  "><Link to={"/chats"} className="border px-3 py-1 hover:bg-button transition duration-300 rounded-xl" >Make a chat</Link></td>
                            {val?.service_complete_by ? <p className="flex justify-center">Pay Now</p> : <p className="flex justify-center">Not completed</p>}


                        </tr>


                    ))}






                </tbody>



            </table>
        </div>

    )

}

export default ConnectedVentureTable