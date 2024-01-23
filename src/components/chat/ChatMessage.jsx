export const ChatMessage = ({ val, user, typing }) => {
    return (
        <div className={user === val?.senderId ? "bg-button text-white p-2  break-words  rounded-md max-w-2/3 self-end mb-2 space-y-1 " : "bg-sec-button p-2 rounded-md max-w-2/3 break-words space-y-1 self-start mb-2"}>

            <div className=" flex font-Outfit gap-4 ">
                 
                 <div className="max-w-[400px] " >
                 <p>{val?.content}   </p>
                 </div>
                
                <p className="font-thin font-Outfit flex justify-end items-end text-xs  ">{(() => {

                    if (val?.updatedAt) {
                        let date = new Date(val?.updatedAt)
                        let hours = date.getHours()
                        let minutes = date.getMinutes().toString().padStart(2, "0")
                        let period = hours >= 12 ? " PM " : " AM "
                        hours = hours % 12 || 12

                        return `${hours}.${minutes}${period}`

                    }

                })()}</p>
            </div>

            <div>
                {typing && <p>typing...</p>}
            </div>

        </div>
    );
};