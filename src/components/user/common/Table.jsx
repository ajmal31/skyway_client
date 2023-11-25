import { useEffect, useState } from "react"
import { VENTURE_SRV_BASE_URL, USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import React from "react"
import { Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import UserSlice from "../../../redux/slices/UserSlice"
import { useNavigate } from "react-router-dom"
const Table = ({ api }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [ventureList, setVentureList] = useState([]);
    const token = useSelector((state = UserSlice) => state.UserSlice.token)
    const [page, setPage] = useState(1)

    //getting All ventures
    const getAllventures = async () => {

        const obj = {
            method: api.method,
            url: api.url,
            data: api.data,
            token: api.token,
            


        }
        const response = await dispatch(fetchData(obj))
        setVentureList(response?.payload?.data?.response)


    }

    useEffect(() => {

        getAllventures()
    }, []);

    //Venture connecting Request
    const handleRequest = async (vid) => {

        if (!token) return navigate('/userLogin')

        const obj = {
            method: 'post',
            url: USER_SRV_BASE_URL + 'callRequested',
            data: { ventureId: vid },
            token: true,
            to: 'user'
        }
        const response = await dispatch(fetchData(obj))


    }


    //pagination section
    const handlePagination = (selectedPage) => {

        if (selectedPage <= Math.ceil(ventureList?.length / 5)
            && selectedPage >= 1 && selectedPage !== page)
            setPage(selectedPage)
    }

    return (
        <div className=" h-full w-full text-gray-500">

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
                    {ventureList?.length>0&&ventureList?.slice(page * 5 - 5, page * 5)?.map((value, index) => (

                        <tr key={index}>

                            <td className={index === page * 5 - 1 ? ("px-5 py-5 text-sm bg-secondory ") : "px-5 py-5 text-sm bg-secondory border-b border-gray-500"}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/final-home-cover.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-300 whitespace-no-wrap">
                                            {value?.ventureName}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className={index === page * 5 - 1 ? ("px-5 py-5 text-sm bg-secondory ") : "px-5 py-5 text-sm bg-secondory border-b border-gray-500"}>
                                <p className="text-gray-300 whitespace-no-wrap">
                                    {value?.expertise_contries}
                                </p>
                            </td>
                            <td className={index === page * 5 - 1 ? ("px-5 py-5 text-sm bg-secondory ") : "px-5 py-5 text-sm bg-secondory border-b border-gray-500"}>
                                <p className="text-gray-300 whitespace-no-wrap">
                                    {/* <Link to={handleRequest}>make request for a call</Link> */}
                                   <Link to={'/ventureDetails'} > <button   >Know More</button></Link>

                                </p>
                            </td>
                            <td className={index === page * 5 - 1 ? ("px-5 py-5 text-sm bg-secondory ") : "px-5 py-5 text-sm bg-secondory border-b border-gray-500"}>
                                <p className="text-gray-300 whitespace-no-wrap">
                                    ⭐⭐🌟⭐⭐
                                </p>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

            <span  >
                <button onClick={e => handlePagination(page - 1)}>Prev &nbsp; </button>
            </span>

            {/* Pagination ui */}
            {
                //create Array the size of the array is 5 devided of the main array and destructure 
                //here and map take it the index
                [...Array(Math?.ceil(ventureList?.length / 5))].map((val, index) => (

                    <span className="bg-secondory content-center  ">

                        <button onClick={e => handlePagination(index + 1)} className={"border  border-gray-500 px-5"}>{index + 1}</button>
                    </span>
                ))
            }
            <span  >
                <button onClick={e => handlePagination(page + 1)}> &nbsp;Next </button>
            </span>

        </div>
    )
}

export default Table