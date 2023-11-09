import { useDispatch } from "react-redux"
import Navbar from "../Home/Navbar"
import { userLogout } from "../../../redux/slices/UserSlice"
const Uprofile = () => {
    const dispatch=useDispatch()
     const Logout=()=>{
        dispatch(userLogout())
     }

    return (

        <div className="bg-primary w-screen  h-screen">

            <Navbar />

            <span className="bg-secondory flex flex-row-2 mx-20 shadow-2xl rounded-3xl pl-16  h-1/2 w-1/2  ">



                <div className="row-span-3 flex justify-center  bg-secondory items-center w-1/4" >



                    <div className=" border w-2/2 rounded-full h-1/2" >
                        <img src="/user-profile.png"
                            className="w-full h-full object-cover rounded-full" alt="" />
                    </div>

                </div>
                <span class="col-span-3 row-span-3 w-3/4  " >
                    <div class="bg-secondory border-gray-300 rounded-3xl pt-5 pl-5">
                        <label htmlFor="" className="text-gray-300 text-sm">Username</label>
                        <h2 class="text-white font-bold">John Doe</h2>
                        <hr class="border-b border-gray-300 w-2/3 " />
                        <label htmlFor="" className="text-gray-300 text-sm">Email</label>
                        <p class="text-white font-bold ">john.doe@example.com</p>
                        <hr class="border-b border-gray-300 w-2/3" />
                        <label htmlFor="" className="text-gray-300 text-sm">Region</label>
                        <p class="text-white font-bold ">india</p>
                        <hr class="border-b border-gray-300 w-2/3" />
                        <label htmlFor="" className="text-gray-300 text-sm">Destination</label>
                        <p class="text-white font-bold ">France</p>
                        <hr class="border-b border-gray-300 w-2/3" />
                        <label htmlFor="" className="text-gray-300 text-sm">Phone</label>
                        <p class="text-white font-bold ">9747343216</p>
                        <hr class="border-b border-gray-300 w-2/3" />
                        <button onClick={Logout} className="text-gray-300 " >Logout</button>

                    </div>
                </span>

                





            </span>
            
            

          


        </div>

    )
}

export default Uprofile