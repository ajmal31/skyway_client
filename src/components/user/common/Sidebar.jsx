import { useDispatch } from "react-redux"
import { ventureLogout } from "../../../redux/slices/ventureSlices"

const Sidebar=()=>{

    const dispatch=useDispatch()

    const logout=()=>{

        dispatch(ventureLogout())
    }

    return(
        <div className="bg-secondory h-full text-center  w-full rounded-2xl  ">

            <button className="text-gray-300 " onClick={logout} >Logout</button>
        </div>
    )
}

export default Sidebar