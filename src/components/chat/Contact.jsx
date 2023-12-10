import Dp from "./Dp"
import { useDispatch } from "react-redux"
import { selectedUser } from "../../redux/slices/chatSlice"
import { useEffect, useState } from "react"
import { USER_SRV_BASE_URL } from "../../data/const"
import { fetchData } from "../../redux/api/api"

const Contact = ({ chats }) => {

    const dispatch=useDispatch()
    const arr = chats
    console.log(chats) 
    const [user,setUser]=useState({})
    const oppositePersonData=async(data)=>{

   
       dispatch(selectedUser(data))
       
    }

    // const getUser=async()=>{
    //      //get user api details
    //     const apiDetails_two = {
    //         method: 'get',
    //         url: USER_SRV_BASE_URL + 'getUser',
    //         data: null,
    //         token: true,
    //         to: 'user'
    //     }
       
    //     const response_one=await dispatch(fetchData(apiDetails_two))
    //     setUser(response_one?.payload?.data?.response)
        
    // }

    // useEffect(()=>{
    //   //?
    // },[])


    return (
        <div>
            {arr?.map((val) => {

                return (

                    <div className=" flex gap-5 hover:bg-button rounded-xl "  onClick={e=>oppositePersonData(val?.data)} >
                        {console.log('what',val)}
                        <Dp h={"h-16"} w={"w-2/12"} />
                        <div >
                            <p className=" font-semibold mt-2 " >{val?.data?.ventureName}</p>
                            <p className="" >Last Message</p>

                        </div>

                    </div>

                )
            })}

        </div>

    )
}

export default Contact