import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { USER_SRV_BASE_URL, VENTURE_SRV_BASE_URL } from "../../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/api/api";
const Dashboard = () => {

    const [totalUsers,setTotalUsers]=useState()
    const [totalVentures,setTotalVentures]=useState()
    const [rejectedVenturesCount,setRejectedVenturesCount]=useState()
    const [pendingVenturesCount,setPendingVenturesCount]=useState()
    const [allowedVenturesCount,setAllowedVenturesCount]=useState()

    const dispatch=useDispatch()

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
    const paymentDiv = {
        initial: { translateY: -50, opacity: 0 },
        animate: { translateY: 0, opacity: 1 },
        transition: { duration: 0.9, ease: "easeInOut" }
    }
    const opacity = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.5 }

    }

    //Dynamic function Fetch data from server
    const fetchDataFromServer = async (baseURL, endpoint, method, data) => {
        const apiDetails = {
            method: method,
            url: baseURL + endpoint,
            data: data,
            token: true,
            to: 'admin'
        };
        const response = await dispatch(fetchData(apiDetails));
        return response?.payload?.data;
    }
    //Get total users count
    const getUsersTotal = async () => {
        const totalUsers = await fetchDataFromServer(USER_SRV_BASE_URL, 'users/count', 'get', null);
        setTotalUsers(totalUsers);
    }
    //Get total ventures count
    const getVenturesTotal = async () => {
        const totalVentures = await fetchDataFromServer(VENTURE_SRV_BASE_URL, 'ventures/count', 'get', null);
        setTotalVentures(totalVentures);
    }
    //Dynamic function ; Taking ventures based on their status like "pending,rejected,allowed"
    const countVenturesByStatus = async (status) => {
        const totalVentures = await fetchDataFromServer(VENTURE_SRV_BASE_URL, '/venture/count/by/status', 'post', { status });
       return totalVentures
    }
    //Get Rejected ventures count
    const rejectedVentures = async () => {
        let response=await countVenturesByStatus("rejected");
        console.log('response rejected',response)
        setRejectedVenturesCount(response)
    }
    //Get pending Ventures count
    const pendingVentures = async () => {
        let response=await countVenturesByStatus("pending");
        console.log('response pending',response)
        setPendingVenturesCount(response)
    }
    //Get allowed ventures count
    const allowedVentures = async () => {
       let response= await countVenturesByStatus("allowed");  // Assuming you have a status called "allowed"
       setAllowedVenturesCount(response)
    }

    
    useEffect(()=>{
       getUsersTotal()
       getVenturesTotal()
       rejectedVentures()
       pendingVentures()
       allowedVentures()
       

    },[])
    return (
        <div className="bg-admin-secondory shadow-2xl p-10   font-Outfit w-10/12 rounded-2xl" >

            <div className="  rounded-2xl w-full h-full " >


                <div className="  w-full h-2/6 flex gap-3   ">

                    <motion.div {...userDiv} className=" bg-admin-primary cursor-pointer flex flex-col p-3 shadow-lg hover:bg-gray-200 duration-500 hover:border-b-4 border-blue-600 rounded-3xl w-3/12">
                        <div className=" " >
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="font-bold text-gray-600 shadow-2xl uppercase text-1xl   " >Total Users</motion.p>

                        </div>
                        <div className="w-full h-full  flex items-center " >


                            <div className="w-1/3 h-1/2 flex border-r-2 border-gray-500 justify-center items-center  " >
                                <HiMiniUsers className="text-6xl text-gray-600 " />
                            </div>
                            <div className="w-2/3 flex justify-center items-center text-1xl font-bold  h-1/2" >
                                <p className="text-gray-700" >{totalUsers}</p>
                            </div>
                        </div>
                        {/* <p className="font-bold text-gray-600 uppercase text-1xl duration-300 hover:border-b hover:border-gray-600 hover:pb-1">Total Users</p> */}

                    </motion.div>
                    <motion.div {...ventureDiv} className=" bg-admin-primary cursor-pointer rounded-3xl shadow-lg w-6/12 hover:bg-gray-200 duration-500 flex flex-col hover:border-b-4 items-center p-4 font-Outfit font-semibold justify-between border-blue-600 ">
                        <div className="w-full h-1/3 " >
                            <p className="text-1xl ml-5 text-gray-700 ">VENTURES</p>
                        </div>
                        <div className="w-full h-1/3 gap-2 flex  pl-1  items-end " >

                            <p className="w-4/12 flex justify-center text-gray-400 " >TOTAL</p>
                            <p className="w-4/12 flex justify-center text-gray-400 " >PENDING</p>
                            <p className="w-4/12 flex justify-center text-gray-400 " >REJECTED</p>
                            <p className="w-4/12 flex justify-center text-gray-400 " >ALLOWED</p>
                            
                        </div>
                        <div className="flex  w-full h-2/3 mt-3 ">
                            <div className="border-r-2 border-gray-400 flex justify-center items-center w-3/12 h-1/2  "  >
                                <p className="text-1xl" >{totalVentures}</p>
                            </div>
                            <div className="border-r-2 flex justify-center items-center border-gray-400 w-3/12 h-1/2 " >
                            <p className="text-1xl" >{pendingVenturesCount}</p>
                            </div>
                            <div className="border-r-2  border-gray-400 justify-center flex items-center w-3/12 h-1/2 " >
                            <p className="text-1xl" >{rejectedVenturesCount}</p>
                            </div>
                            <div className=" justify-center flex items-center w-3/12 h-1/2 " >
                            <p className="text-1xl" >{allowedVenturesCount}</p>
                            </div>
                        </div>
                    </motion.div>
                    {/* <motion.div  {...paymentDiv} className=" bg-admin-primary cursor-pointer hover:scroll-m-1.5  shadow-lg rounded-3xl w-4/12 hover:bg-gray-200 duration-500 hover:border-b-4 border-blue-600 font-semibold justify-between font-Outfit flex items-center flex-col p-4 ">

                    <div className="w-full h-1/3 " >
                            <p className="text-1xl ml-5 text-gray-700 ">PAYMENTS</p>
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
        </div>
    )
}
export default Dashboard