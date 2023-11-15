import { useEffect, useState }from "react"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import React from "react"
import { Link, Navigate } from "react-router-dom"
const Table = () => {

    let arr = [1, 2, 3, 4, 5];
    const dispatch = useDispatch();
    const [ventureList, setVentureList] = useState([]);
    
    const getAllventures=async()=>{
        console.log('helo')
        const obj={
            method:'get',
            url:VENTURE_SRV_BASE_URL+'getAllVentures',
            data:null,
            token:false
        }
        const response=await dispatch(fetchData(obj))
        setVentureList(response?.payload?.data?.response)
        

    }
    console.log('response in client',ventureList)
    useEffect(() => {
        
        getAllventures()
    },[]);
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
                               <Link to={'/makeRequest'}>make request for a call</Link>
                               
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