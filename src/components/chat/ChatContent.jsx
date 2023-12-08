import Dp from "./Dp"
import { useSelector } from "react-redux"
import chatSlice from "../../redux/slices/chatSlice"
const ChatContent = () => {

    const data=useSelector((state=chatSlice)=>state.chatSlice)
    console.log('resonse from chatslice',data)
    if(!data)console.log('user Id not selected')
    else console.log('user selected go and take userDetails',data)
    return (
        <div className="bg-secondory h-full w-3/5 p-5 text-gray-300 rounded-xl " >
            <div className=" w-full h-full" >
                {/* Head of chat content  */}
                <div className="h-1/6 w-full pt-2 flex bg-secondory" >
                    <div className="w-2/12 flex flex-wrap justify-center items-center ">
                        <div className=" h-full w-4/5 rounded-full" >
                            <img src="/temp/venture-contact-dp.png" className="h-full w-full" alt="Venture_Contact_Image" />
                        </div>

                    </div>
                    <div className="w-10/12  h-full" >
                        <div  >
                            <p className=" font-semibold mt-3 " >Zarah</p>
                            <p className="" >Last seen 12.30 pm</p>

                        </div>

                    </div>
                </div>
                <hr className="border-gray-500" />
                {/* Message Input Box */}
                <div className="h-5/6 w-full flex " >

                    <div className="flex w-full items-end justify-end">
                        <div className=" w-full    " >
                            <input type="text" className="w-full p-3 rounded-xl bg-transparent border border-gray-500 " placeholder="enter your message" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default ChatContent