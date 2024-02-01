import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/api/api";
import { useEffect, useState, useRef } from "react";
import { CHAT_SRV_SOCKET_URL, CHAT_SRV_BASE_URL } from "../../data/const";
import cookie from "js-cookie";
// import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
import EmptyChat from "./EmptyChat";
import "../../../src/scroll.css"
import { IoSend } from "react-icons/io5";
import { changeCount } from "../../redux/slices/chatSlice";

//socket port spectification
// const socket = io(CHAT_SRV_SOCKET_URL);

const ChatContent = ({ roll,socket }) => {

    //taking userId from cookie
    const userId = cookie.get('userId');
    //taking ventureId from cookie
    const ventureId = cookie.get("ventureId");
    //taking selected user data from redux
    const data = useSelector((state) => state.chatSlice);
    const dispatch = useDispatch();
    //for storing chat messages
    const [chat, setChat] = useState([]);
    let [chatId, setChatId] = useState()
    const [isTyping, setIsTyping] = useState(false)

    //storing Input message
    const [message, setMessage] = useState('');
    const [header, setHeader] = useState({})
    const scrollDownRef = useRef(null)

    //scroll handler
    useEffect(() => {
        if (scrollDownRef.current) {
            scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat, isTyping]);


    //typing evene listener
    socket.on('typing', () => {

        console.log(`typing event listner in client ${roll} side`)
    })

    useEffect(() => {
        const fetchData = async () => {

            if (data?.oppsitePersonData != null) {

                let response = await getChat();

                if (response) {

                    socket.emit("joinRoom", response);
                    setChatId(response)

                }

            }

        };

        fetchData();
    }, [data?.oppsitePersonData]);

    //taking chat details and storing messages to chat state
    async function getChat() {
        const apiDetails_chat = {
            method: 'post',
            url: CHAT_SRV_BASE_URL + 'getChat/' + roll,
            data:
            {
                ventureId: roll === "venture" ? ventureId : data?.oppsitePersonData?._id,
                userId: roll === "user" ? userId : data?.oppsitePersonData?._id,
                roll: roll
            },
            token: true,
            to: roll
        };

        const response_chat = await dispatch(fetchData(apiDetails_chat));

        if (!response_chat?.payload?.data || response_chat?.payload?.data?.message.length < 1) setChat([])
        else {
            let messages = Array?.from(response_chat?.payload?.data?.message && response_chat?.payload?.data?.message);
            setChat(messages);
            setHeader(response_chat?.payload?.data)
        }


        //return chat id (Game Changer😍)

        return response_chat?.payload?.data?._id
    };

        socket.on('received', (data) => {

        
            if (chatId === data?.chatId) {
                setChat([...chat, data?.content])
    
            } 
            return dispatch(changeCount(Math.random() * 1 * 10))
    
    
        })

    let typingTimeout;

    //typing event handle function
    const handleOnchange = (e) => {

        setMessage(e.target.value)
        // socket.emit("typing", chatId)

        // clearTimeout(typingTimeout)
        // typingTimeout = setTimeout(() => {
        //     setIsTyping(false)
        // }, 1000)

        // setIsTyping(true)

    }

    //Handling message
    const handleMessage = () => {
        let payload = {
            senderId: roll === "venture" ? ventureId : userId,
            receiverId: data?.oppsitePersonData?._id,
            content: message,
            updatedAt: new Date()
        };
        let receiver = roll === "venture" ? "userUnReadMessages" : "ventureUnReadMessages"
        // setChat([...chat, payload])
        payload = { ...payload, receiver }

        socket.emit('message', payload)
        setMessage('');
        dispatch(changeCount(Math.random() * 1 * 10))


    };


    if (!data.oppsitePersonData) return <EmptyChat  />

    return (
        <div className="bg-secondory h-full w-3/5 px-8  pb-14 pt-2 text-gray-300 rounded-xl">
            <div className="w-full h-full  ">
                <div className="h-1/6 w-full  flex bg-secondory">
                    <div className="w-2/12 flex flex-wrap justify-center items-center ">
                        <div className="h-5/6  w-3/5 rounded-full overflow-hidden">
                            <img src={roll==="venture"? data.oppsitePersonData.profile_image:data.oppsitePersonData?.logo ??`/temp/venture-contact-dp.png`} className="h-full w-full" alt="Venture_Contact_Image" />
                        </div>
                    </div>
                    <div className="w-10/12  h-full">
                        <div className="" >
                            <p className="font-semibold mt-6 ">{roll === "venture" ? data.oppsitePersonData.username : data.oppsitePersonData.ventureName}</p>
                            {/* <p className="">Last seen 12.30 pm</p> */}
                        </div>
                    </div>
                </div>
                <hr className="border-gray-500" />
                <div className="max-w-screen-md mx-auto h-4/5 ">
                    <div className="flex flex-col mb-2 px-1 overflow-auto  mt-1 max-h-full items-start"  >
                        {chat?.map((val, index) => <ChatMessage key={index} val={val} user={roll === "venture" ? ventureId : userId} typing={isTyping && index == chat.length - 1} />)}
                        <div ref={scrollDownRef} ></div>
                    </div>
                </div>


                <div className="h-1/12 w-full flex  ">
                    <div className="flex w-full items-end justify-end  ">
                        <div className="w-full flex gap-2  ">
                            <input
                                
                                
                                type="text"
                                className="w-11/12 p-3  rounded-xl bg-transparent border border-gray-500 break-words"
                                value={message}
                                onChange={handleOnchange}
                                placeholder="enter your message"
                            />
                            <button className="w-1/12 bg-button rounded-full flex items-center justify-center p-3" onClick={handleMessage}><IoSend /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
