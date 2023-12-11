import Contact from "./Contact"
const VentureList=({chats,roll})=>{

return(

    <div className="h-4/5 m-5 ml-0 w-full   mb " >
        <Contact chats={chats} roll={roll} />
    </div>
)

}

export default VentureList