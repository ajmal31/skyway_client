import Dp from "./Dp"
import { useDispatch } from "react-redux"
import { selectedUser } from "../../redux/slices/chatSlice"

const Contact = ({ chats }) => {

    const dispatch=useDispatch()
    const arr = chats
    console.log(chats) 
    const ids=async(senderId,receiverId)=>{

        console.log('selected user ids',senderId,receiverId)
   
       dispatch(selectedUser({senderId,receiverId}))
      return ''
    }


    return (
        <div>
            {arr?.map((val) => {

                return (

                    <div className=" flex gap-5 hover:bg-button rounded-xl "  onClick={e=>ids(val?.senderId,val?.receiverId)} >
                        {console.log(val)}
                        <Dp h={"h-16"} w={"w-2/12"} />
                        <div >
                            <p className=" font-semibold mt-2 " >Zarah</p>
                            <p className="" >Last Message</p>

                        </div>

                    </div>

                )
            })}

        </div>

    )
}

export default Contact