import { useState } from "react";
import { CHAT_SRV_BASE_URL } from "../data/const";
import { fetchData } from "../redux/api/api";
import { useDispatch } from "react-redux";

export const createChat=async()=>{

    const dispatch=useDispatch()
    const [chat,setChat]=useState()
    const apiDetails = {
        method: 'post',
        url: CHAT_SRV_BASE_URL + 'createChat',
        data: { receiverId: vid, senderId: userId },
        token: true,
        to: 'user'
      }
      let chatCreated = await dispatch(fetchData(apiDetails))
      setChat(chatCreated)
      return chat

}

