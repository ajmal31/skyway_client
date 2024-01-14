import { useEffect } from "react"
import BgBox from "../../../components/user/common/BgBox"
import Modal from "../../../components/user/common/Modal"
import { useParams } from "react-router-dom"
import Navbar from "../../../components/user/Home/Navbar"


const VentureDetails = (prop) => {

    const { id } = useParams()





    return (

        <div className="bg-primary flex flex-row  justify-center  w-screen " >


            {/* <div className="border flex flex-col" >
                <Navbar />
            </div> */}

            <div className="h-full  flex justify-center  items-center w-5/6">

                <BgBox id={id} />


            </div>

        </div>

    )

}

export default VentureDetails