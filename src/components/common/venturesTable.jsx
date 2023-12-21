import { useEffect, useState } from "react"
import { ADMIN_SRV_BASE_URL, VENTURE_SRV_BASE_URL } from "../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/api/api"
import { useSelector } from "react-redux"
import { changeVentureStatus } from "../../redux/slices/ventureSlices"
import ventureSlices from "../../redux/slices/ventureSlices"

const VenturesTable = () => {

    const ventureStatus=useSelector((state=ventureSlices)=>state.ventureSlices.pending)
    console.log('ventureStatus from redux',ventureStatus)
    const dispatch = useDispatch()
    const [ventures, setVentures] = useState([])
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
        console.log('response in venture tables ', response)
        // setVentureStatus(response?.payload?.data?.response?.admin_allowed)
        setVentures(response?.payload?.data?.response)

    }
    //  should change token to true somehitng in backend while making true  solve it 
    const updateVentureStatus = async (ventureId) => {


        const obj = {
            method: 'post',
            url: VENTURE_SRV_BASE_URL + 'updateVentureStatus',
            data: { id: ventureId },
            token: true,
            to: 'admin'
        }
        const response = await dispatch(fetchData(obj))
        console.log('afte changing venture status')
        console.log(response)
        if (response?.payload?.data) {
            console.log('going to update redux venture status')
            
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
                    {ventures?.slice((page * (count) - count), page * count)?.map((value, index) => (

                        <tr className="bg-admin-primary  ">
                            {console.log('maping value', value)}
                            <td className="p-3 ">{value?.ventureName}</td>
                            <td className="p-3">50000</td>
                            <td className="p-3">20000</td>

                            <td className="p-3 ">{value?.admin_allowed}</td>
                            <div>
                            {value?.admin_allowed === "pending" ? <button className=" border border-black rounded-2xl shadow-2xl px-2 ml-2" onClick={e => updateVentureStatus(value?._id)} > <td className="p-2">Allow</td></button> : ''}
                            <button className=" border border-black rounded-2xl shadow-2xl px-2 ml-2" > <td className="p-2 text-right ">Reject</td></button>
                            </div>
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
                    {[...Array(Math.ceil(ventures?.length / count))]?.Map((_, index) => (



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