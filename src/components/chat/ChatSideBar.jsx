import VentureList from "./VentureList"
const ChatSideBar=()=>{
    return (
        <div className="bg-secondory w-2/5 h-full p-5 text-gray-300 font-Outfit rounded-xl" >
            <h1 className="text-2xl" >ventures</h1>
            <VentureList/>
        </div>
    )

}

export default ChatSideBar