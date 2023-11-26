import { useEffect } from "react"
import BgBox from "../../../components/user/common/BgBox"
import Modal from "../../../components/user/common/Modal"
import { useParams } from "react-router-dom"


const VentureDetails = (prop) => {

    const{id}=useParams()





    return (

        <div className="bg-primary   full flex justify-center items-center w-screen" >
          
            <div className=" h-full  w-5/6">
           
            <BgBox id={id} />
            

            </div>

        </div>

    )

}

export default VentureDetails