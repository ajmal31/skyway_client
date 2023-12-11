import ChatSideBar from "../../components/chat/ChatSideBar"
import ChatContent from "../../components/chat/ChatContent"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"
import { CHAT_SRV_BASE_URL, USER_SRV_BASE_URL } from "../../data/const"
import { useEffect, useState } from "react"
const Chat = ({ roll="user" }) => {

    const dispatch = useDispatch()
    const [allchats, setAllchats] = useState([])
    const fetchAllChats = async () => {

        //all connected Venture for chat list 
        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + 'getAllConnectedVentures',
            data: null,
            token: true,
            to: 'user'
        }
        const apiDetails_two = {
            method: 'get',
            url: USER_SRV_BASE_URL + 'getAllGenuineUsers',
            data: null,
            token: true,
            to: 'venture'

        }
        if (roll !== "venture") {
            const response = await dispatch(fetchData(apiDetails))
            
            setAllchats(response?.payload?.data?.response)

        }else {
            const response=await dispatch(fetchData(apiDetails_two))
            setAllchats(response?.payload?.data?.response)
            
        }


    }
    

    
        useEffect(() => {

            fetchAllChats()

        }, [])

    

    return (

        <div className=" bg-primary px-16 py-10  flex gap-3 " >

            <ChatSideBar chats={allchats} roll={roll} />
            <ChatContent roll={roll}/>

        </div>
    )


}

export default Chat