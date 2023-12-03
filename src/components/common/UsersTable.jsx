import { useEffect, useState } from "react"
import { fetchData } from "../../redux/api/api"
import { ADMIN_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"

const UsersTable = (prop) => {
    const { roll, api } = prop?.content


    const dispatch = useDispatch()
    const [users, setUsers] = useState([])

    const getData = async () => {


        const response = await dispatch(fetchData(api))
        console.log('all users', response)
        if (roll === 'venture') setUsers(response?.payload?.data?.data)
        if (roll === 'admin') setUsers([...response?.payload?.data?.response].reverse())

    }
    console.log('users state', users)
    useEffect(() => {

        getData()

    }, [])

    //pagination
    const [page, setPage] = useState(1)
    const count = 9
    const handlePagination=(selectedPage)=>{
       if(selectedPage<=Math.ceil(users.length/count)&&selectedPage>0&&selectedPage!==page)
        setPage(selectedPage)
    }

    return (
        // bg-admin-primary border-b-4
        <div className="font-Outfit w-full p-5  ">
            <table className="w-full  ">
                <thead className={roll === "venture" ? "bg-secondory text-gray-200 border-b-4" : "bg-admin-primary border-b-4"}>

                    <tr>
                        <th className="p-3 text-left">User Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone number</th>
                        {/* <th className="p-3 text-left">status</th> */}
                        <th className="p-3 text-left">Document Status</th>
                    </tr>

                </thead>

                <br />
                <tbody  >
                    {users?.slice(page * count - count, page * count)?.map((value, index) => (

                        <tr className={roll === "venture" ? "bg-secondory text-gray-200 " : "bg-admin-primary"}>
                            {console.log(value)}
                            <td className="p-3 ">{roll === 'venture' ? value?.username : value?.username}</td>
                            <td className="p-3">{roll === 'venture' ? value?.email : value?.email}</td>
                            <td className="p-3">{roll === 'venture' ? value?.phone : value?.phone}</td>
                            {/* <td className="p-3">{ventures}</td> */}
                            <td className="p-3 ">not found</td>
                        </tr>


                    ))}


                </tbody>


            </table>
            <div className={roll==='venture'? " text-gray-300 flex justify-end  ":"  flex justify-end  "} >
                <span className="border p-1 px-2 rounded " >
                    <button onClick={e=>handlePagination(page-1)} >Prev</button>
                </span>
                {
                    [...Array(Math.ceil(users?.length/count))]?.map((_,index)=>(
                        <span className="border p-1 px-2">
                            <button onClick={e=>handlePagination(index+1)} >{index+1}</button>
                        </span>
                    ))
                }
                
                <span className="border p-1 px-2 rounded">
                    <button onClick={e=>handlePagination(page+1)} >Next</button>
                </span>
            </div>
        </div>
    )

}

export default UsersTable