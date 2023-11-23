import { useEffect, useState } from "react"
import { ADMIN_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"

const VenturesTable=()=>{

    const dispatch=useDispatch()
    const[ventures,setVentures]=useState([])

    const getData=async()=>{

        const obj={
            method:'get',
            url:ADMIN_SRV_BASE_URL+'getAllVentures',
            data:null,
            token:true,
            to:'admin'
        }

        const response=await dispatch(fetchData(obj))
        console.log('response in venture tables ',response)
        setVentures(response?.payload?.data)

    }

    useEffect(()=>{

        getData()

    },[])

    return(

        <div className="font-Outfit w-full p-5  ">
            <table className="w-full  ">
                <thead className="bg-admin-primary border-b-4 ">
                    
                    <tr>
                        <th className="p-3 text-left">ventures</th>
                        <th className="p-3 text-left">Revenue</th>
                        <th className="p-3 text-left">pending Amount</th>
                        {/* <th className="p-3 text-left">status</th> */}
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                   
                </thead> 
               
               <br />
                <tbody  >
                    {ventures?.map((value,index)=>(
                        
                        <tr className="bg-admin-primary  ">
                    {console.log(value)}
                        <td className="p-3 ">{value?.ventureReplicated?.ventureName}</td>
                        <td className="p-3">50000</td>
                        <td className="p-3">20000</td>
                       
                        <td className="p-3 ">{value?.ventureReplicated.admin_allowed}</td>
                        <button className="border px-5 " > <td className="p-3">Allow</td></button>
                        <button className="border px-5 ml-2" > <td className="p-3 text-right ">Rejected</td></button>
                    </tr> 
                     

                     ))} 
                     
                    
                </tbody>
               

            </table>
        </div>
    )

}

export default VenturesTable