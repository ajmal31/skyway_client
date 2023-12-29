import Dp from "./Dp"
import { useDispatch, useSelector } from "react-redux"
import { selectedUser } from "../../redux/slices/chatSlice"
import { useEffect, useState } from "react"
import { CHAT_SRV_BASE_URL, USER_SRV_BASE_URL,CHAT_SRV_SOCKET_URL } from "../../data/const"
import { fetchData } from "../../redux/api/api"
import cookie from "js-cookie"

const Contact = ({ chats, roll }) => {

    const dispatch = useDispatch()
    const arr = chats
    let uid = cookie.get('userId')
    let vid = cookie.get('ventureId')
    let data = useSelector((state) => state.chatSlice)
    let [count,setCount]=useState('')
    let [showNotification,setShowNotification]=useState(true)
    const [allChats, setAllChats] = useState([])
    const oppositePersonData = async (data) => {

        dispatch(selectedUser(data))
        setShowNotification(false)
        //seen message so shoul be update unREad messages to zero
        let ventureId = roll === "venture" ? vid : data?._id
        let userId = roll === "user" ? uid : data?._id
        let field = roll === "user" ? "userUnReadMessages" : "ventureUnReadMessages"

        const apidetails = {
            method: "post",
            url: CHAT_SRV_BASE_URL + `clear/unRead/messages/${roll}`,
            data: { ventureId, userId, field },
            token: true,
            to: roll

        }

        dispatch(fetchData(apidetails))
        getAllChats()


    }

   

    async function getAllChats() {

 

        const apiDetails = {
            method: "post",
            url: CHAT_SRV_BASE_URL + `all/chats/${roll}/${roll === "venture" ? vid : uid}`,
            data: {field:roll==="user"?"userId":"ventureId"},
            token: true,
            to: roll
        }

        const response = await dispatch(fetchData(apiDetails))
        setAllChats(response?.payload?.data?.response)

    }

    useEffect(() => {
        getAllChats()
    }, [data?.count])

    return (
        <div>
            {allChats?.map((val, index) => {

                return (

                    <div className=" flex gap-5 hover:bg-button cursor-pointer rounded-xl p-1 " key={index} onClick={e => oppositePersonData(val?.data[0]?.data)} >
                     
                        <Dp h={"h-16"} w={"w-2/12"} />
                        <div className=" w-full" >
                            <div className="flex justify-between" >

                                <p className=" font-semibold mt-2 " >{roll === "venture" ? val?.data[0]?.data?.username : val?.data[0]?.data?.ventureName}</p>
                               
                                {roll==="user"&&val?.participants[0].userUnReadMessages!==0&&showNotification || roll==="venture"&&val?.participants[0].ventureUnReadMessages!==0&&showNotification ?  <p className= 'mr-2  rounded-full w-5 h-5 flex justify-center items-center mt-2  bg-button ' >{roll==="user"?val?.participants[0].userUnReadMessages:val?.participants[0].ventureUnReadMessages}</p>:''}
                            </div>


                            <div className="flex justify-between  pr-2">
                                
                                <p className=" w-9/12  " >{val?.last_message[0]?.content ?? "Let's start a chat ?"}</p>


                                <p className=" w-3/12 flex justify-end ">
                                    {(() => {
                                        if (val?.last_message[0]?.updatedAt) {
                                            const date = new Date(val?.last_message[0]?.updatedAt);
                                            let hours = date.getHours();
                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                            const period = hours >= 12 ? 'PM' : 'AM';

                                            // Convert to 12-hour format
                                            hours = hours % 12 || 12;
                                             
                                             if(hours&&minutes&&period)
                                             return `${hours}.${minutes} ${period}`;
                                            else return ''

                                        }
                                        return ''

                                    })()}
                                </p>
                            </div>



                        </div>

                    </div>

                )
            })}

        </div>

    )
}

export default Contact