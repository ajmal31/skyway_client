import { useState, useEffect } from "react";
import { io } from "socket.io-client"
import { CHAT_SRV_SOCKET_URL } from "../data/const";


export const useSocket = () => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io(CHAT_SRV_SOCKET_URL)

        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }

    }, [])

    return socket

}