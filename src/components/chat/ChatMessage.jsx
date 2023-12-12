export const ChatMessage = ({ val, user }) => {
    return (
        <div className={user=== val?.senderId ? "bg-button text-white p-2 rounded-md max-w-2/3 self-end mb-2" : "bg-sec-button p-2 rounded-md max-w-2/3  self-start mb-2"}>
            {val?.content}
        </div>
    );
};