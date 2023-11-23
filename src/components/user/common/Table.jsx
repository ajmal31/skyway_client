import { useEffect, useState }from "react"
import { VENTURE_SRV_BASE_URL,USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import React from "react"
import { Link, Navigate } from "react-router-dom"
const Table = ({api}) => {

   
    const dispatch = useDispatch();
    const [ventureList, setVentureList] = useState([]);
    
    const getAllventures=async()=>{

        const obj={
            method:api.method,
            url:api.url,
            data:api.data,
            token:api.token
        }
        const response=await dispatch(fetchData(obj))
        setVentureList(response?.payload?.data?.response)
        

    }
 
    useEffect(() => {
        
        getAllventures()
    },[]);

    const handleRequest=async(vid)=>{
        
       const obj={
         method:'post',
         url:USER_SRV_BASE_URL+'callRequested',
         data:{ventureId:vid},
         token:true
       } 
       const response=await dispatch(fetchData(obj))

       console.log('response in client related request MAKE A CALL')
       console.log(response)
        
    }
    return (
        <div className=" h-full w-full">

            <table className="min-w-full leading-normal   ">
                <thead>
                    <tr>
                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-secondory border-b border-gray-200">
                            Venture Names
                        </th>
                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-secondory border-b border-gray-200">
                            Destinations
                        </th>
                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-secondory border-b border-gray-200">
                            Actions 
                        </th>
                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-secondory border-b border-gray-200">
                            Rating
                        </th>
                    </tr>
                </thead>
                <tbody>
                     {ventureList?.map((value,index)=>(

                    <tr key={index}>
                        
                        <td className="px-5 py-5 text-sm  bg-secondory border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="#" className="relative block">
                                        <img alt="profil" src="/final-home-cover.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-200 whitespace-no-wrap">
                                        {value.ventureName}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-secondory border-b border-gray-200">
                            <p className="text-gray-200 whitespace-no-wrap">
                               {value.expertise_contries}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-secondory border-b border-gray-200">
                            <p className="text-gray-200 whitespace-no-wrap">
                               {/* <Link to={handleRequest}>make request for a call</Link> */}
                               <button  onClick={e=>handleRequest(value._id)} >Make Request for a call</button>
                               
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-secondory border-b border-gray-200">
                            <p className="text-gray-200 whitespace-no-wrap">
                               ⭐⭐🌟⭐⭐
                            </p>
                        </td>
                        
                    </tr>
                     ))}
                   
                </tbody>
            </table>
        </div>
    )
}

export default Table