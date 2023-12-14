import { useSelector } from "react-redux";
import { CHAT_SRV_BASE_URL } from "../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/api/api";
import { useEffect, useState } from "react";
import { CHAT_SRV_SOCKET_URL } from "../../data/const";
import cookie from "js-cookie";
import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
//socket port spectification
const socket = io(CHAT_SRV_SOCKET_URL);

const ChatContent = ({ roll }) => {

    //taking userId from cookie
    const userId = cookie.get('userId');
    //taking ventureId from cookie
    const ventureId = cookie.get("ventureId");
    //taking selected user data from redux
    const data = useSelector((state) => state.chatSlice);
    const dispatch = useDispatch();
    //for storing chat messages
    const [chat, setChat] = useState([]);
    console.log(chat, 'chat')
    //storing Input message
    const [message, setMessage] = useState('');



    //taking chat details and storing messages to chat state
    const getChat = async () => {
        const apiDetails_chat = {
            method: 'post',
            url: CHAT_SRV_BASE_URL + 'getChat/' + roll,
            data: { receiverId: data?.oppsitePersonData?._id, roll: roll },
            token: true,
            to: roll
        };

        const response_chat = await dispatch(fetchData(apiDetails_chat));
        if (!response_chat?.payload?.data || response_chat?.payload?.data?.message.length < 1)
            return setChat([])
        let messages = Array?.from(response_chat?.payload?.data?.message && response_chat?.payload?.data?.message);
        setChat(messages);

        //return chat id (Game Changer😍)
        return response_chat?.payload?.data?._id
    };



    socket.on('received', (data) => {
        console.log(`message recieved ${roll} side`)
        setChat([...chat, data])

    })




    useEffect(() => {
        const fetchData = async () => {
            let response = await getChat();
            if (response) {
                socket.emit("joinRoom", response);

            }
        };

        fetchData();
    }, [data?.oppsitePersonData]);

    //Handling message
    const handleMessage = () => {
        const payload = {
            senderId: roll === "venture" ? ventureId : userId,
            receiverId: data?.oppsitePersonData?._id,
            content: message
        };
        console.log('current payload', payload)
        setChat([...chat, payload])
            socket.emit('message', payload)
            setMessage('');
            console.group('after updating payload', chat)


    };






    return (
        <div className="bg-secondory h-full w-3/5 p-5 text-gray-300 rounded-xl">
            <div className="w-full h-full">
                <div className="h-1/6 w-full pt-2 flex bg-secondory">
                    <div className="w-2/12 flex flex-wrap justify-center items-center">
                        <div className="h-full w-4/5 rounded-full">
                            <img src="/temp/venture-contact-dp.png" className="h-full w-full" alt="Venture_Contact_Image" />
                        </div>
                    </div>
                    <div className="w-10/12  h-full">
                        <div>
                            <p className="font-semibold mt-3">Zarah</p>
                            <p className="">Last seen 12.30 pm</p>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-500" />
                <div className="max-w-screen-md mx-auto s  mt-10">
                    <div className="flex flex-col mb-2 px-1 scroll-ml-10 items-start">
                        {chat?.map((val, index) => <ChatMessage key={index} val={val} user={roll === "venture" ? ventureId : userId} />)}
                    </div>
                </div>
                <div className="h-5/6 w-full flex">
                    <div className="flex w-full items-end justify-end">
                        <div className="w-full flex gap-2  ">
                            <input
                                type="text"
                                className="w-11/12 p-3 rounded-xl bg-transparent border border-gray-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="enter your message"
                            />
                            <button className="w-1/12 bg-button rounded-full p-3" onClick={handleMessage}>send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
