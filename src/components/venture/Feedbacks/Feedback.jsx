import { useEffect, useState } from "react"
import Modal from "./Modal"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
import Cookies from "js-cookie"
import ReactStars from "react-stars"

const Feedback = () => {

    const [show, setShow] = useState(false)
    const [allComments, setAllComments] = useState([])
    const [content,setContent]=useState('')
    const id = Cookies.get("ventureId")

    const onClose = () => setShow(false)


    const dispatch = useDispatch()

    const getAllComments = async () => {

        const apiDetails = {
            method: 'get',
            url: VENTURE_SRV_BASE_URL + `get/all/comments/${id}`,
            data: null,
            token: false,
            to: 'user'
        }
        const response = await dispatch(fetchData(apiDetails))
        setAllComments(response?.payload?.data)

    }
    useEffect(() => {
        getAllComments()
    }, [])
    const findComment = (id) => {

        const k=allComments.find((val)=>val._id===id)
        setContent(k?.content)
        setShow(true)


    }

    return (



        <div className="font-Outfit w-full p-5  ">
            {console.log("what about show", allComments)}
            {show && <Modal onClose={onClose} allComments={allComments} content={content} />}
            {/* Table */}
            <table className="w-full  ">
                {/* Table Head */}
                <thead className="bg-secondory text-gray-200 border-b-4 cursor-pointer" >

                    <tr>
                        <th className="p-3 text-left">User Name</th>
                        <th className="p-3 text-left">content</th>
                        <th className="p-3 text-left">Rating</th>
                        {/* <th className="p-3 text-left">status</th> */}
                    </tr>

                </thead>

                <br />
                {/* Table Body */}

                <tbody  >
                    {allComments.map((val) => (

                        <tr className="bg-secondory text-gray-200 hover:bg-primary   " onClick={e => findComment(val._id)} >

                            <td className="p-3 ">{val.userName}</td>
                            <td className="p-3">{val.content}</td>
                            <td className="p-3"><ReactStars value={val.rating} size={20} /></td>
                            {/* <td className="p-3">{ventures}</td> */}




                        </tr>



                    ))}




                </tbody>


            </table>
            {/* {
                users?.length >= 9 &&
                <div className={roll === 'venture' ? " text-gray-300 flex justify-end  " : "  flex justify-end  "} >
                    <span className="border p-1 px-2 rounded " >
                        <button onClick={e => handlePagination(page - 1)} >Prev</button>
                    </span>
                    {
                        [...Array(Math.ceil(users?.length / count))]?.map((_, index) => (
                            <span className="border p-1 px-2">
                                <button onClick={e => handlePagination(index + 1)} >{index + 1}</button>
                            </span>
                        ))
                    }

                    <span className="border p-1 px-2 rounded">
                        <button onClick={e => handlePagination(page + 1)} >Next</button>
                    </span>
                </div>
            } */}
        </div>

    )

}

export default Feedback