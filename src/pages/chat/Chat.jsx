import ChatSideBar from "../../components/chat/ChatSideBar"
import ChatContent from "../../components/chat/ChatContent"
const Chat = () => {

    return (

        <div className="h-screen w-screen bg-primary px-16 py-10  flex gap-3 " >

            <ChatSideBar />
            <ChatContent/>

        </div>
    )


}

export default Chat