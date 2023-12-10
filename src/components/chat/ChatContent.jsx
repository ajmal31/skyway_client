
import { useSelector } from "react-redux"
import chatSlice from "../../redux/slices/chatSlice"
import { CHAT_SRV_BASE_URL, USER_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"
import { useEffect, useState } from "react"
const ChatContent = () => {


    const data = useSelector((state = chatSlice) => state.chatSlice)
    const dispatch = useDispatch()
    const [chat, setChat] = useState([])
    const [user,setUser]=useState({})


    console.log('oppsite person data',data)
   
    useEffect(() => {
        getChat()

    },[data])
      
    if(!data.oppsitePersonData) return <h1 className="font-Outfit text-gray-300">Please Select chat</h1>
 


    async function getChat(){

        const apiDetails_chat = {
            method: 'post',
            url: CHAT_SRV_BASE_URL + 'getChat',
            data: {receiverId:data?.oppsitePersonData?._id},
            token: true,
            //here user because user token is should wanna check user is logged or not
            to: 'user'
        }
        const apiDetails_user = {
            method: 'get',
            url: USER_SRV_BASE_URL + 'getUser',
            data: null,
            token: true,
            //here user because user token is should wanna check user is logged or not
            to: 'user'
        }
        

        const response_chat = await dispatch(fetchData(apiDetails_chat))
        let messages=Array.from(response_chat?.payload?.data?.message)
        setChat(messages)
        const response_user=await dispatch(fetchData(apiDetails_user))
        console.log('user detauls in chat',response_user)
        setUser(response_user?.payload?.data?.response)
        

        

    }


    


    return (
        <div className="bg-secondory h-full w-3/5 p-5 text-gray-300 rounded-xl " >
            <div className=" w-full h-full" >
                {/* Head of chat content  */}
                <div className="h-1/6 w-full pt-2 flex bg-secondory" >
                    {/* current User avatar */}
                    <div className="w-2/12 flex flex-wrap justify-center items-center ">
                        <div className=" h-full w-4/5 rounded-full" >
                            <img src="/temp/venture-contact-dp.png" className="h-full w-full" alt="Venture_Contact_Image" />
                        </div>

                    </div>
                    {/* current user info */}
                    <div className="w-10/12  h-full" >
                        <div  >
                            <p className=" font-semibold mt-3 " >Zarah</p>
                            <p className="" >Last seen 12.30 pm</p>

                        </div>

                    </div>
                </div>
                <hr className="border-gray-500" />
                {/* Message Display Area */}
                <div className="max-w-screen-md mx-auto   mt-10">
                    <div className="flex flex-col mb-2 px-1 items-start">
                        {chat?.map((val, index) => (
                         
                            user?._id===val?.senderId?
                                
                                    <div key={index} className="bg-button text-white p-2 rounded-md max-w-2/3 self-end mb-2">
                                       
                                         {val?.content}
                                    </div>

                                
                            
                               :
                               
                                    <div key={index} className="bg-sec-button p-2 rounded-md max-w-2/3  self-start mb-2">
                                      {val?.content}
                                   
                                    </div>
                            

                                
                            

                        ))}


                        {/* Add more messages as needed */}
                    </div>
                </div>
                {/* Message Input Box */}
                <div className="h-5/6 w-full flex " >

                    <div className="flex w-full items-end justify-end">
                        <div className=" w-full flex gap-2  " >
                            <input type="text" className="w-11/12 p-3  rounded-xl bg-transparent border border-gray-500 " placeholder="enter your message" />
                           
                            <button className="w-1/12 bg-button rounded-full  p-3">send</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default ChatContent