import { useEffect, useState } from "react"
import {  VENTURE_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"
import { useSelector } from "react-redux"
import { changeVentureStatus } from "../../redux/slices/ventureSlices"
import ventureSlices from "../../redux/slices/ventureSlices"
import { ImBlocked } from "react-icons/im";
import { Link } from "react-router-dom"
import StartRating from "react-stars"

const VenturesTable = () => {

    const ventureStatus=useSelector((state=ventureSlices)=>state.ventureSlices.pending)

    const dispatch = useDispatch()
    const [ventures, setVentures] = useState([])
    const [avg_store,setAvg_store]=useState([])
    // const [ventureStatus,setVentureStatus]=useState(null)

    const getData = async () => {

        const obj = {
            method: 'post',
            url: VENTURE_SRV_BASE_URL + 'getAllVentures',
            data: { type: "all" },
            token: true,
            to: 'admin'
        }

        const response = await dispatch(fetchData(obj))
      
        // setVentureStatus(response?.payload?.data?.response?.admin_allowed)
        console.log("all ventures",response)
        const {Allventures,avg_store}=response?.payload?.data?.response
        setVentures(Allventures)
        setAvg_store(avg_store)


    }
    //  should change token to true somehitng in backend while making true  solve it 
    const updateVentureStatus = async (ventureId,status) => {


        const obj = {
            method: 'post',
            url: VENTURE_SRV_BASE_URL + 'updateVentureStatus',
            data: { id: ventureId,status:status },
            token: true,
            to: 'admin'
        }
        const response = await dispatch(fetchData(obj))
        if (response?.payload?.data) {
           
            
            return dispatch(changeVentureStatus())

        }
    }

    useEffect(() => {

        getData()


    }, [ventureStatus])

    //pagination

    const [count, setCount] = useState(8)
    const [page, setPage] = useState(1)
    const handlePagination = (selectedPageCount) => {

        if (selectedPageCount <= Math.ceil(ventures?.length / count) && selectedPageCount > 0 && selectedPageCount !== page)
            setPage(selectedPageCount)

    }

    return (

        <div className="font-Outfit w-full h-full p-5  ">
        
            <table className="w-full  ">
               
                <thead className="bg-admin-primary border-b-4 ">

                    <tr>
                        <th className="p-3 text-left">ventures</th>
                        {/* <th className="p-3 text-left">Revenue</th>
                        <th className="p-3 text-left">pending Amount</th> */}
                        <th className="p-3 text-left">Rating</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>

                </thead>

                <br />
                <tbody  >
                    {ventures?.slice((page * (count) - count), page * count)?.map((value, index) => (

                        <tr className="bg-admin-primary  ">
                            {console.log('maping value', value)}
                            <td className="p-3 ">{value?.ventureName}</td>
                            <td> <StartRating count={5} value={avg_store[index]} color2="blue"  size={15} edit={false} /></td>
                            {/* <td className="p-3">50000</td>
                            <td className="p-3">20000</td> */}

                            <td className="p-3 ">{value?.admin_allowed}</td>
                            <td className="flex justify-center" >
                            <div className=" flex justify-center items-center">
                            <Link to={`/admin/ventureDetails/${value._id}` } ><button className="border border-black rounded-2xl shadow-2xl px-2 ml-2"   ><td className="p-1" >View</td></button></Link>
                            {value?.admin_allowed === "pending" ? <button className=" border border-black rounded-2xl shadow-2xl px-2 ml-2" onClick={e => updateVentureStatus(value?._id,"allowed")} > <td className="p-2">Allow</td></button> : ''}
                            {value?.admin_allowed==="allowed"?<button className=" border border-black rounded-2xl shadow-2xl px-2 ml-2" > <td className="p-1 text-right " onClick={e=>updateVentureStatus(value._id,"rejected")} >Reject</td></button>:''}
                            {value?.admin_allowed==="rejected"?<button className=" border border-black rounded-2xl shadow-2xl px-2 ml-2 text-center cursor-not-allowed " > Rejected</button>:'' }
                            
                            </div>
                            </td>
                        </tr>


                    ))}


                </tbody>


            </table>
            {/* pagination ui */}
            {
                ventures?.length>=8 &&
                <div className="flex justify-end " >
                    <span className="p-1 border" >
                        <button onClick={e => handlePagination(page - 1)} >Prev</button>
                    </span>
                    {[...Array(Math.ceil(ventures?.length / count))]?.map((_, index) => (



                        < span className="p-1 border px-3">

                            <button onClick={e => handlePagination(index + 1)} >{index + 1}</button>

                        </span>
                    ))

                    }

                    <span className="p-1 border" >
                        <button onClick={e => handlePagination(page + 1)} >Next</button>
                    </span>
                </div>
            }

        </div >
    )

}

export default VenturesTable