import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { useParams } from "react-router-dom"
import { USER_SRV_BASE_URL } from "../../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/api/api";
import Cookies from "js-cookie";
import diffrenceInDays from "date-fns/differenceInDays"
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from "date-fns/differenceInMinutes"

const ShowingUserDetails = () => {

    const { userId } = useParams()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    let ventureId = Cookies.get("ventureId")
    const [userStatus, setUserStatus] = useState('')

    const getUserData = async () => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + `/get/one/user/${userId}`,
            data: null,
            token: true,
            to: 'venture'
        }
        let response = await dispatch(fetchData(apiDetails))

        response = response.payload.data.response
        console.log('respose', response)
        setUserData(response)

    }

    useEffect(() => {
        getUserData()


    }, [])


    const div1 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.2, ease: 'easeIn' }

    }
    const div2 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.4, ease: 'easeIn' }

    }
    const div3 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.6, ease: 'easeIn' }

    }
    const div4 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.8, ease: 'easeIn' }

    }
    const style = {
        className: "border w-4/12 flex flex-col rounded-2xl bg-admin-secondory shadow-xl hover:bg-gray-400 duration-500 items-center "
    }
    var documentlabels = []
    if (userData !== null) {
        console.log('user data after checking wether null or not',userData)
        documentlabels = [
            { title: "GovId", Link: userData.documents[0]?.govId },
            { title: "Adhar", Link: userData.documents[0]?.aadhar },
            { title: "Pancard", Link: userData.documents[0]?.pancard },
            { title: "Passport", Link: userData.documents[0]?.passport }
        ]

    }

    const credentialLabels = [
        { title: userData?.username, value: '#' },
        { title: userData?.email, value: '#' },
        { title: userData?.phone, value: '#' },
        { title: userData?.region + " (region)", value: '#' },
        { title: userData?.destination + " (dest)", value: '#' }
    ]

    const handleStartService = async (action) => {
          
        const api_details = {
            method: "post",
            url: USER_SRV_BASE_URL + `/venture/service/${action}`,
            data: { ventureId: ventureId, userId: userData?._id },
            token: true,
            to: 'venture'
        }
        const response = await dispatch(fetchData(api_details))
        console.log('response ',response)
        setUserData(response.payload.data)

    }

    const handleStatus=async(status)=>{

        const apiDetails = {
            method: 'post',
            url: USER_SRV_BASE_URL + '/changeUserStatus',
            data: { userId: userId, status: status },
            token: true,
            to: 'venture'
        }
        const response=await dispatch(fetchData(apiDetails))
        console.log('after clicking reject',response)
        setUserData(response?.payload?.data)

    }
   

    return (
        <div className="flex gap-4 h-full w-full text-gray-400 font-Outfit " >



            <div className="w-1/2 h-1/2  rounded-2xl bg-primary shadow-2xl hover:border-b-2  border-gray-500 ">


                <div className="h-full w-full flex-col  ">


                    <div className="  w-full h-full flex  flex-col justify-center  items-center  " >

                        {/* <p className="font-semibold  " >AJMAL DOCUMENTS</p> */}
                        <div className=" border-gray-300 flex rounded-lg  pl-1 h-5/6 w-5/6 " >
                            <div className="w-1/2 h-full">
                                {userData?.documents[0] ? documentlabels?.map((val, index) => (
                                    <div className="mt-2 " >
                                        <div className=" w-full flex justify-between  items-center" >

                                            <a href={val.Link} target="_blank" className="cursor-pointer" >{val.title}</a>
                                            {/* <MdDownloadForOffline className="cursor-pointer" /> */}
                                        </div>

                                        <hr className="w-full rounded-full " />
                                    </div>

                                )) : <h1>Document not found</h1>}
                            </div>
                            <div className="border-l  w-1/2 h-full">

                                {credentialLabels?.map((val, index) => (
                                    <div className="mt-2 " >
                                        <div className=" w-full flex justify-between overflow-hidden pl-1 items-center" >

                                            <a href={val.Link} target="_blank " >{val.title}</a>

                                        </div>

                                        <hr className="w-full rounded-full " />
                                    </div>

                                ))}

                            </div>


                        </div>

                    </div>


                    <div className="flex">




                    </div>


                </div>
            </div>
            <div className="w-1/4 h-1/2  rounded-2xl font-Outfit bg-primary shadow-lg hover:border-b-2 p-2 border-gray-500 ">

                <div className="h-full w-full  " >


                    {/* <div className=" w-full flex   flex-col mt-2 items-center  " >

                        <p className="font-semibold" >TOTAL USERS</p>

                    </div> */}
                    <div className="  h-4/5 flex item justify-center">

                        <div className=" flex items-center flex-col  p-2 w-1/2 " >


                            <p className=" w-[200px] text-2xl uppercase ">user status</p>
                            <div className="  flex flex-col justify-evenly w-full h-full">

                                <div className="  w-full h-1/2 flex  items-center justify-center ">
                                    {console.log("helo")}
                                    <button className="" >{userData !== null && userData?.ventures[userData?.ventures?.findIndex(venture => venture?.ventureId === ventureId)]?.status}</button>
                                </div>
                                <div className=" w-full h-1/2 flex  justify-center gap-2 items-center ">


                                    {userData?.ventures[userData?.ventures?.findIndex(venture => venture?.ventureId === ventureId)].status !== "allowed" ? <button className="border rounded-2xl h-2/5 flex justify-center items-center py-3 px-3 hover:bg-button  " onClick={()=>handleStatus("allowed")} >Allow</button> : ''}

                                    <button className="border rounded-2xl h-2/5 flex justify-center items-center py-3 px-3 hover:bg-button" onClick={()=>handleStatus('rejected')} >Reject</button>

                                </div>


                            </div>

                        </div>
                        {/* <div className=" border-l w-1/2 flex flex-col  items-center "  >

                            <div className=" flex justify-center pt-2 h-1/5 " >
                                <p className="text-2xl uppercase">service status</p>
                            </div>
                            <div className=" flex justify-center  items-center h-2/5 pt-2" >
                                {}
                                {userData !== null && userData?.ventures[userData?.ventures?.findIndex(venture => venture?.ventureId === ventureId)]?.service_start_by ?
                                    <p>{(() => {

                                        let serviceStarted = new Date(userData?.ventures[userData?.ventures?.findIndex(venture => venture?.ventureId === ventureId)]?.service_start_by)
                                        console.log("date",serviceStarted)
                                        let currentDate = new Date()
                                        let difference = currentDate - serviceStarted
                                        // Convert difference to days, hours, and minutes
                                        let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
                                        console.log("diffrennce",difference)
                                       return `Day ${daysDifference+1} only ${30-daysDifference-1} Days Left`

                                    })()}</p> :
                                    <button className="border px-2 rounded-2xl" onClick={e=>handleStartService("start")} >start {userData?.username} service</button>}

                                  
                            </div>
                            {userData !== null && userData?.ventures[userData?.ventures?.findIndex(venture => venture?.ventureId === ventureId)]?.service_complete_by? <p>Waiting for payment</p> :  <button className=" border px-2 py-1 rounded-xl hover:bg-button transition duration-300 "  onClick={e=>handleStartService("completed")} >completed</button>  }                        

                        </div> */}
                        

                    </div>


                </div>

            </div>





        </div>
    )
}

export default ShowingUserDetails