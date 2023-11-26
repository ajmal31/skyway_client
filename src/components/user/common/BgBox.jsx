import About from "../ventureDetails/About"
import Card from "./Card"
import Graph from "./Graph"
import Feedback from "./Feedback"
import Modal from "./Modal"
import { useEffect, useState } from "react"
import { useme } from "../../../hooks/toast"
import { ToastContainer } from "react-toastify"
import { VENTURE_SRV_BASE_URL,USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
const BgBox=({id})=>{

  const dispatch=useDispatch()
  const[venutureData,setVentureData]=useState({})
  //taking particular venture details
  const makeCall=async()=>{

     const obj={
        method:'get',
        url:VENTURE_SRV_BASE_URL+`getOneVenture/${id}`,
        data:null,
        token:false,
        to:"venture"
     }
     const response=await dispatch(fetchData(obj))
     setVentureData(response?.payload?.data)
     

  }
 

  useEffect(()=>{

    makeCall()
  },[])

  const [visible,setVisible]=useState(false)

  //Closing the modal
  const handleOnClose=()=>setVisible(false)
  const handleRequest = async (vid) => {
 
    
   
    const obj = {
        method: 'post',
        url: USER_SRV_BASE_URL + 'callRequested',
        data: { ventureId: vid },
        token: true,
        to: 'user'
    }
    const response = await dispatch(fetchData(obj))
    const {data}=response.payload
    if(data==="You Already Requested This venture. please wait for their response")
    useme(data,'warning')
    else useme(data,'success')


}


  return (

    <div className=" bg-primary text-gray-300 h-full w-full mt-10 rounded-3xl " >
         <button className="border p-2 hover:bg-gray-600 rounded-xl font-Outfit  " onClick={e=>setVisible(true)} >Let's connect With us</button>
         {/* PASS TO MODAL VENTURE ID */}
         <Modal visible={visible} onClose={handleOnClose} connectUser={handleRequest} id={venutureData?._id} />
         

        <p className="text-4xl font-Outfit my-6">About us</p>
        <About content={venutureData?.description}/>
        
        <p className="text-4xl my-8 text-center font-Outfit">Our Main Destinations</p>
        <Card/> 
        
        <p className="text-4xl text-center my-8 font-Outfit">Our Trusts</p>
        <Card certificates={true} />
        <p className="text-4xl text-center my-8 font-Outfit">Customer Feedback About the Abc Company</p>
        <Graph/>
        <p className="text-4xl text-center my-8 font-Outfit">Point Out Your Valuable Words About us</p>
        <Feedback/>
       <ToastContainer/>
        
    </div>
  )


}
export default BgBox