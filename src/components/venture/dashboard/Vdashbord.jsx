import { motion } from "framer-motion"
import { HiMiniUsers } from "react-icons/hi2";
import {USER_SRV_BASE_URL, VENTURE_SRV_BASE_URL} from "../../../data/const"
import {useDispatch} from "react-redux"
import { fetchData } from "../../../redux/api/api";
import { useEffect, useState } from "react";
const VentureDashbord = () => {

    const dispatch=useDispatch() 
    const [totalUsersCount,setTotalUsersCount]=useState(0)
    const [allowedUsersCount,setAllowedUsersCount]=useState(0)
    const [rejectedUsersCount,setRejectedUsersCount]=useState(0)
    const [pendingUsersCount,setPendingUsersCount]=useState(0)
    const Hover = {
        initial: { scale: 1 },
        whileHover: { scale: 1.1 }
    }
    const userDiv = {
        initial: { translateY: -50, opacity: 0 },
        animate: { translateY: 0, opacity: 1 },
        transition: { duration: 0.3, ease: "easeInOut" }
    }
    const ventureDiv = {
        initial: { translateY: -50, opacity: 0 },
        animate: { translateY: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeInOut" }
    }

    const getUsersCountByVenture=async(url,status=null)=>{

        const apiDetails={
           method:"get",
           url: status ?USER_SRV_BASE_URL+url+status:USER_SRV_BASE_URL+url,
           data:null,
           token:true,
           to:"venture"

        }
        const response=await dispatch(fetchData(apiDetails))
        const {data}=response?.payload
        if(!status)setTotalUsersCount(data)
        else if(status==="allowed") setAllowedUsersCount(data)
        else if(status==="pending") setPendingUsersCount(data)
        else if(status==="rejected") setRejectedUsersCount(data)
        
    }

    

    useEffect(()=>{
        getUsersCountByVenture("users/count/by/venture")
        getUsersCountByVenture("users/count/by/venture/","allowed")
        getUsersCountByVenture("users/count/by/venture/","pending")
        getUsersCountByVenture("users/count/by/venture/","rejected")

    },[])

    return (
        <div className="  rounded-2xl w-full h-full " >


            <div className="  w-full h-2/6 flex gap-3 text-gray-400  ">

                <motion.div {...userDiv} className=" bg-primary cursor-pointer flex flex-col p-3 shadow-lg hover:bg-button duration-500 hover:border-b-4 border-gray-400 rounded-3xl w-3/12">
                    <div className=" " >
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="font-bold text-gray-400 shadow-2xl uppercase text-1xl   " >Total Users</motion.p>

                    </div>
                    <div className="w-full h-full  flex items-center " >


                        <div className="w-1/3 h-1/2 flex border-r-2 border-gray-500 justify-center items-center  " >
                            <HiMiniUsers className="text-6xl text-gray-400 " />
                        </div>
                        <div className="w-2/3 flex justify-center items-center text-1xl font-bold  h-1/2" >
                            <p className="text-gray-400" >{totalUsersCount}</p>
                        </div>
                    </div>
                    {/* <p className="font-bold text-gray-400 uppercase text-1xl duration-300 hover:border-b hover:border-gray-600 hover:pb-1">Total Users</p> */}

                </motion.div>
                <motion.div {...ventureDiv} className=" bg-primary cursor-pointer rounded-3xl shadow-lg w-6/12 hover:bg-button duration-500 flex flex-col hover:border-b-4 items-center p-4 font-Outfit font-semibold justify-between border-gray-400 ">
                    <div className="w-full h-1/3 " >
                        <p className="text-1xl ml-5 text-gray-400 ">VENTURES</p>
                    </div>
                    <div className="w-full h-1/3 gap-2 flex  pl-1  items-end " >

                        <p className="w-4/12 flex justify-center text-gray-400 " >TOTAL</p>
                        <p className="w-4/12 flex justify-center text-gray-400 " >PENDING</p>
                        <p className="w-4/12 flex justify-center text-gray-400 " >REJECTED</p>
                        <p className="w-4/12 flex justify-center text-gray-400 " >ALLOWED</p>

                    </div>
                    <div className="flex  w-full h-2/3 mt-3 ">
                    <div className=" justify-center flex items-center w-3/12 h-1/2 " >
                            <p className="text-1xl" >{totalUsersCount}</p>
                        </div>
                        <div className="border-r-2 border-gray-400 flex justify-center items-center w-3/12 h-1/2  "  >
                            <p className="text-1xl" >{pendingUsersCount}</p>
                        </div>
                        <div className="border-r-2 flex justify-center items-center border-gray-400 w-3/12 h-1/2 " >
                            <p className="text-1xl" >{rejectedUsersCount}</p>
                        </div>
                        <div className="border-r-2  border-gray-400 justify-center flex items-center w-3/12 h-1/2 " >
                            <p className="text-1xl" >{allowedUsersCount}</p>
                        </div>
                       
                    </div>
                </motion.div>
                {/* <motion.div  {...paymentDiv} className=" bg-primary cursor-pointer hover:scroll-m-1.5  shadow-lg rounded-3xl w-4/12 hover:bg-button duration-500 hover:border-b-4 border-gray-400 font-semibold justify-between font-Outfit flex items-center flex-col p-4 ">

                    <div className="w-full h-1/3 " >
                        <p className="text-1xl ml-5 text-gray-400 ">PAYMENTS</p>
                    </div>
                    <div className="w-full h-1/3  flex  items-end " >

                        <p className="w-6/12 flex justify-start ml-5 text-gray-400 " >INCOME</p>
                        <p className="w-6/12 flex justify-center text-gray-400 " >OUTGOINGS</p>


                    </div>
                    <div className="flex w-full h-2/3 mt-3  ">
                        <div className="border-r-2 border-gray-400 flex justify-center items-center pr-6 w-6/12 h-1/2  "  >
                            <p className="text-1xl" >598695</p>
                        </div>
                        <div className=" flex justify-center ml-2 items-center border-gray-400 w-6/12 h-1/2 " >
                            <p className="text-1xl" >8508343</p>
                        </div>

                    </div>

                </motion.div> */}

            </div>
            <div></div>


        </div>
    )
}
export default VentureDashbord