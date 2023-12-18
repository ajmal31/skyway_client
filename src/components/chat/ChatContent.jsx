import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/api/api";
import { useEffect, useState,useRef } from "react";
import { CHAT_SRV_SOCKET_URL,CHAT_SRV_BASE_URL } from "../../data/const";
import cookie from "js-cookie";
import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
import EmptyChat from "./EmptyChat";
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

    //storing Input message
    const [message, setMessage] = useState('');
    const [header,setHeader]=useState({})
    const scrollDownRef=useRef(null)

    //scroll handler
    useEffect(() => {
        if (scrollDownRef.current) {
            scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[chat]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getChat();
            if (response) {
                socket.emit("joinRoom", response);

            }
        };

        fetchData();
    }, [data?.oppsitePersonData]);

    //taking chat details and storing messages to chat state
    async function getChat(){
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
        setHeader(response_chat?.payload?.data)

        //return chat id (Game Changer😍)
        return response_chat?.payload?.data?._id
    };

    socket.on('received', (data) => {
        setChat([...chat, data])

    })


    //Handling message
    const handleMessage = () => {
        const payload = {
            senderId: roll === "venture" ? ventureId : userId,
            receiverId: data?.oppsitePersonData?._id,
            content: message
        };
        setChat([...chat, payload])
            socket.emit('message', payload)
            setMessage('');
            


    };


    if(!data.oppsitePersonData)return <EmptyChat/>

     return(
        <div className="bg-secondory h-full w-3/5 p-10 text-gray-300 rounded-xl">
            <div className="w-full h-full ">
                <div className="h-1/6 w-full pt-2 flex bg-secondory">
                    <div className="w-2/12 flex flex-wrap justify-center items-center">
                        <div className="h-full w-4/5 rounded-full">
                            <img src="/temp/venture-contact-dp.png" className="h-full w-full" alt="Venture_Contact_Image" />
                        </div>
                    </div>
                    <div className="w-10/12  h-full">
                        <div>
                            {console.log('header',roll==="venture"?data.oppsitePersonData.username:data.oppsitePersonData.ventureName)}
                            <p className="font-semibold mt-3">{roll==="user"?data?.oppsitePersonData?.username:data?.oppsitePersonData.ventureName}</p>
                            <p className="">Last seen 12.30 pm</p>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-500" />
                <div className="max-w-screen-md mx-auto   mt-10">
                    <div className="flex flex-col mb-2 px-1 overflow-auto  max-h-72 items-start">
                        {chat?.map((val, index) => <ChatMessage key={index} val={val} user={roll === "venture" ? ventureId : userId} />)}
                        <div ref={scrollDownRef} ></div>
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
