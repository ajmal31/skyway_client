import { Link } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_SRV_BASE_URL } from "../../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/api/api";
import env from "../../../data/env";
const ConnectedVentureTable = ({ data }) => {


    const dispatch = useDispatch()

    console.log('data in table', data)
    const tableLabels = [
        { label: 'Venture Name ' },
        { label: 'Your status ' },
        { label: 'Service status ' },
        { label: 'Payment' },
    ]



    const makePayment = async (ventureName, vid) => {

        console.log('venturename', ventureName, vid)
        const stripe = await loadStripe(env.STRIPE_SECRET_ID);

        const apidetails = {

            method: 'post',
            url: PAYMENT_SRV_BASE_URL + "payment-intent",
            data: { ventureName: ventureName, vid: vid },
            token: true,
            to: "user"
        }

        const response = await dispatch(fetchData(apidetails))
        console.log("payment response", response)

        const result = await stripe.redirectToCheckout({
            sessionId: response.payload.data.sessionId
        })
        console.log('result finally', result)
        // if(result.error){
        //     console.log('error occured while intgrationg stripe',result.error.message)
        // }


    }

    return (

        <div className="font-outfit  text-gray-400 mb-14 rounded-2xl bg-secondory xl:w-[1110px] lg:w-[900px] md:w-full sm:w-[1000px] min-[200px]:w-[1000px] ">

            {data.length <= 0 ? <h1 className="text-center p-5" >You're not connected any ventures </h1> :

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
                                <td className="p-3  text-center ">{val?.service_started_by ? "started" : "Not started"}</td>
                                <td className="p-3  text-center  "><Link to={"/chats"} className=" px-3 py-1 hover:bg-button transition duration-300 rounded-xl" >Make a chat</Link></td>


                            </tr>


                        ))}






                    </tbody>



                </table>
            }
        </div>

    )

}

export default ConnectedVentureTable