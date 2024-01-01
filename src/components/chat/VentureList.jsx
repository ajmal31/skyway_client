import Contact from "./Contact"
const VentureList=({chats,roll,socket})=>{

return(

    <div className="h-4/5 m-5 ml-0 w-full   mb " >
        <Contact chats={chats} roll={roll} socket={socket} />
    </div>
)

}

export default VentureList