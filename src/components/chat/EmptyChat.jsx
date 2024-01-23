
const EmptyChat=()=>{

     const src='/chat/empty-chat.png'
    return(
        <div className="bg-secondory h-full w-3/5 p-10 text-gray-300 flex justify-center items-center  rounded-xl" >
            <div className="w-4/6 h-4/6 flex justify-center items-center">

            <img src={src} alt="empty chat" />
            </div>
           
        </div>
        
    )

}

export default EmptyChat