export const ChatMessage = ({ val, user, typing }) => {
    return (
        <div className={user === val?.senderId ? "bg-button text-white p-2 rounded-md max-w-2/3 self-end mb-2 space-y-1 " : "bg-sec-button p-2 rounded-md max-w-2/3  space-y-1 self-start mb-2"}>

            <div className="mb-1">
               
                <p>{val?.content} { (()=>{

                    let date=new Date(val?.updatedAt)
                    let hours=date.getHours()
                    let minutes=date.getMinutes().toString().padStart(2,"0")
                    let period= hours >=12 ?" PM ":" AM "
                    hours=hours % 12 || 12

                    return `${hours}.${minutes}${period}`
                })() }  </p>
            </div>
            
            <div>
                {typing && <p>typing...</p>}
            </div>

        </div>
    );
};