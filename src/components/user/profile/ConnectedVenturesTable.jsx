import { Link } from "react-router-dom"
import {loadStripe} from '@stripe/stripe-js';
import { PAYMENT_SRV_BASE_URL } from "../../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/api/api";
const ConnectedVentureTable = ({ data }) => {


    const dispatch=useDispatch()
   
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


   const makePayment=async()=>{

    const stripe = await loadStripe('pk_test_51OWkDdSA5K986loxjeATAlNSQRqk0Zj2r3VckkUyAhl2ORLDpgJwlnti8hzCmjoV2L9NkHLjZSntqNQlx96wZcpf00f2qM0oJR');

    const apidetails={

        method:'post',
        url:PAYMENT_SRV_BASE_URL+"payment-intent",
        data:{name:"service"},
        token:true,
        to:"user"
    }

    const response=await dispatch(fetchData(apidetails))
    console.log("payment response",response)

    const result=await stripe.redirectToCheckout({
        sessionId:response.payload.data.sessionId
    })
    if(result.error){
        console.log('error occured while intgrationg stripe',result.error.message)
    }
   

   }

    return (

        <div className="font-outfit  text-gray-400 mb-14 rounded-2xl bg-secondory  w-full">
    
    {data.length<=0?<h1 className="text-center p-5" >You're not connected any ventures </h1>:

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
                            <td className="p-3  text-center  "><Link to={"/chats"} className=" px-3 py-1 hover:bg-button transition duration-300 rounded-xl" >Make a chat</Link></td>
                           <td className=" p-3 flex justify-center">{val?.service_complete_by ? <button className="flex justify-center border px-3 rounded-2xl transition hover:bg-button duration-300 " onClick={makePayment} >Pay Now</button> : <p className="flex justify-center">Not completed</p>}</td> 


                        </tr>


                    ))}






                </tbody>



            </table>
}
        </div>

    )

}

export default ConnectedVentureTable