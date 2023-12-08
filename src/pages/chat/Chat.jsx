import ChatSideBar from "../../components/chat/ChatSideBar"
import ChatContent from "../../components/chat/ChatContent"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"
import { CHAT_SRV_BASE_URL } from "../../data/const"
import { useEffect, useState } from "react"
const Chat = ({roll}) => {

   const dispatch=useDispatch()
   const [allchats,setAllchats]=useState([])
   const fetchAllChats=async()=>{

       const apiDetails={
        method:'get',
        url:CHAT_SRV_BASE_URL+'getAllChats',
        data:null,
        token:true,
        to:'user'
       }
       const response=await dispatch(fetchData(apiDetails))
       console.log('where is it',response)
       setAllchats(response?.payload?.data?.response)
       
   }

if(roll!=='venture'){
    useEffect(()=>{

        fetchAllChats()
    
       },[])

}  
   
    return (

        <div className="h-screen w-screen bg-primary px-16 py-10  flex gap-3 " >

            <ChatSideBar chats={allchats} />
            <ChatContent/>

        </div>
    )


}

export default Chat