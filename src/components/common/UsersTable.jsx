import { useEffect, useState } from "react"
import { fetchData } from "../../redux/api/api"
import { VENTURE_SRV_BASE_URL, USER_SRV_BASE_URL,CHAT_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import cookie from "js-cookie"

const UsersTable = (prop) => {
    const { roll = "admin", api } = prop?.content


    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [ventureId, setVentureId] = useState('')
    let vid=cookie.get("ventureId")
    const navigate = useNavigate()

    //api call destination
    const getData = async () => {


        const response = await dispatch(fetchData(api))
        if (roll === 'venture') {

            setUsers(response?.payload?.data?.users)
            setVentureId(response?.payload?.data?.ventureId)
        }
        if (roll === 'admin') setUsers([...response?.payload?.data?.response].reverse())

    }

    useEffect(() => {

        getData()

    }, [])

    const handleAllow = async (uid) => {
         console.log("handle allow clicked ")
        const apiDetails = {
            method: 'post',
            url: USER_SRV_BASE_URL + '/changeUserStatus',
            data: { userId: uid, status: 'allowed' },
            token: true,
            to: 'venture'
        }
        
        const response = await dispatch(fetchData(apiDetails))


        if (response.payload.data) {
            getData()
        }

    }


    const createChat=async(uid)=>{
        //chat service api details
        const api_one = {
            method: 'post',
            url: CHAT_SRV_BASE_URL + 'createChat/venture',
            data: { ventureId: vid, userId: uid },
            token: true,
            to: 'venture'
        }
        //venture service api details
        const api_two = {
            method: 'post',
            url: VENTURE_SRV_BASE_URL + 'getVentureUpdateChat/venture',
            data: { vid: vid },
            token: true,
            to: 'venture'
        }
        //User service api details
        const api_three = {
            method: 'post',
            url: USER_SRV_BASE_URL + 'getUserUpdateChat/venture',
            data: { userId: uid },
            token: true,
            to: 'venture'
        }
        //creating chat
        let chatCreated = await dispatch(fetchData(api_one))
        //take data from venture Hear receiver id represing the 
        //venture( hear will be only boolen while RabbitMQ make
        // request so handle it using that boolean)👆

        //This api call taken venture details based on the id and 
        //update to chat service👇
        let ventureData = await dispatch(fetchData(api_two))

        //This api call take user details based ont he id and 
        //update to chat service👇
        let userData = await dispatch(fetchData(api_three))
        console.log('response ',chatCreated)
        console.log('response ',ventureData)
        console.log('response ',userData)

        navigate('/venture/chats')



    }

    const buttonStyle = "border border-gray-300 px-4 py-1 mt-2 rounded-xl hover:bg-button  "

    //pagination
    const [page, setPage] = useState(1)
    const count = 9
    const handlePagination = (selectedPage) => {
        if (selectedPage <= Math.ceil(users.length / count) && selectedPage > 0 && selectedPage !== page)
            setPage(selectedPage)
    }

    return (
        // bg-admin-primary border-b-4
        <div className="font-Outfit w-full p-5  ">
            {/* Table */}
            <table className="w-full  ">
                {/* Table Head */}
                <thead className={roll === "venture" ? "bg-secondory text-gray-200 border-b-4" : "bg-admin-primary border-b-4"}>

                    <tr>
                        <th className="p-3 text-left">User Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone number</th>
                        {/* <th className="p-3 text-left">status</th> */}
                      {roll==="venture"&& <th className="p-3 text-left">Profile</th>}
                        {roll == "venture" ? (<th className="p-3 text-left">Actions</th>) : ''}
                    </tr>

                </thead>

                <br />
                {/* Table Body */}
                <tbody  >
                    {users?.slice(page * count - count, page * count)?.map((value, index) => (

                        <tr className={roll === "venture" ? "bg-secondory text-gray-200 " : "bg-admin-primary"}>
                            {console.log(value)}
                            <td className="p-3 ">{roll === 'venture' ? value?.username : value?.username}</td>
                            <td className="p-3">{roll === 'venture' ? value?.email : value?.email}</td>
                            <td className="p-3">{roll === 'venture' ? value?.phone : value?.phone}</td>
                            {/* <td className="p-3">{ventures}</td> */}
                           {roll==="venture"&& <td className="p-3 "><Link to={`/venture/userDetails/${value._id}`} ><button className="border p-1 rounded-xl px-2 hover:bg-button">show profile</button></Link></td>}


                            {roll === "venture" ?
                                //button desgin venture side
                                // console.log(ventureId)
                                value?.ventures?.[value?.ventures?.findIndex(venture => venture.ventureId === ventureId)].status == "pending" ?
                                    <Link onClick={e => handleAllow(value?._id)} >
                                        <button className={buttonStyle} >Allow</button>
                                    </Link> : <button className={buttonStyle}  onClick={e=>createChat(value?._id)} >Make a chat</button> : ''

                            }
                        </tr>


                    ))}


                </tbody>


            </table>
            {
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
            }
        </div>
    )

}

export default UsersTable