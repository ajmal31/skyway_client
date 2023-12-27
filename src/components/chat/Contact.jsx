import Dp from "./Dp"
import { useDispatch } from "react-redux"
import { selectedUser } from "../../redux/slices/chatSlice"
import { useEffect, useState } from "react"
import { CHAT_SRV_BASE_URL, USER_SRV_BASE_URL } from "../../data/const"
import { fetchData } from "../../redux/api/api"
import cookie from "js-cookie"

const Contact = ({ chats, roll }) => {

    const dispatch = useDispatch()
    const arr = chats
    let userId = cookie.get('userId')
    let ventureId = cookie.get('ventureId')
    const [allChats, setAllChats] = useState([])
    const oppositePersonData = async (data) => {

        dispatch(selectedUser(data))

    }


    const getAllChats = async () => {

        const apiDetails = {
            method: "get",
            url: CHAT_SRV_BASE_URL + `all/chats/${roll}/${roll === "venture" ? ventureId : userId}`,
            data: null,
            token: true,
            to: roll
        }

        const response = await dispatch(fetchData(apiDetails))

        setAllChats(response?.payload?.data?.response)

    }

    useEffect(() => {

        getAllChats()
    }, [])

    return (
        <div>
            {arr?.map((val, index) => {

                return (

                    <div className=" flex gap-5 hover:bg-button cursor-pointer rounded-xl p-1 " key={index} onClick={e => oppositePersonData(roll === "venture" ? val : val?.data)} >
                        <Dp h={"h-16"} w={"w-2/12"} />
                        <div className=" w-full" >
                            <div className="flex justify-between" >
                                
                                <p className=" font-semibold mt-2 " >{roll === "venture" ? val?.username : val?.data?.ventureName}</p>
                                <p className="mr-2  rounded-full w-5 h-5 flex justify-center items-center mt-2  bg-button  " >2</p>
                            </div>

 
                            <div className="flex justify-between pr-2">
                                <p className="" >{allChats[index]?.lastMessage.content}</p>


                                <p>
                                    {(() => {
                                        const date = new Date(allChats[index]?.lastMessage?.updatedAt);
                                        let hours = date.getHours();
                                        const minutes = date.getMinutes().toString().padStart(2, '0');
                                        const period = hours >= 12 ? 'PM' : 'AM';

                                        // Convert to 12-hour format
                                        hours = hours % 12 || 12;

                                        return `${hours}.${minutes} ${period}`;
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