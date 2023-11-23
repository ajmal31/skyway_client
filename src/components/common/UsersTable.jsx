import { useEffect,useState } from "react"
import { fetchData } from "../../redux/api/api"
import { ADMIN_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"

const UsersTable = () => {

    const dispatch=useDispatch()
    const [users,setUsers]=useState([])

    const getData=async()=>{

        const obj={
            method:'get',
            url:ADMIN_SRV_BASE_URL+'getAllUsers',
            data:null,
            token:true,
            to:'admin'
        }
        const response=await dispatch(fetchData(obj))
        console.log('all users',response)
        setUsers(response.payload.data)

    }
    console.log('users state',users)
    useEffect(()=>{

     getData()

    },[])



    return (

        <div className="font-Outfit w-full p-5  ">
            <table className="w-full  ">
                <thead className="bg-admin-primary border-b-4 ">
                    
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
                    {users?.map((value,index)=>(
                        <tr className="bg-admin-primary  ">
                    
                        <td className="p-3 ">{value?.data?.username}</td>
                        <td className="p-3">{value?.data?.email}</td>
                        <td className="p-3">{value?.data?.phone}</td>
                        {/* <td className="p-3">{ventures}</td> */}
                        <td className="p-3 ">not found</td>
                    </tr> 
                     

                    ))}
                     
                    
                </tbody>
               

            </table>
        </div>
    )

}

export default UsersTable