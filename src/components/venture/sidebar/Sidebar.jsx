import { Link, useNavigate } from "react-router-dom"
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaGoogleWallet } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdChatbubbles } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { ventureLogout } from "../../../redux/slices/ventureSlices.js";
import { useDispatch } from "react-redux";
const Sidebar = () => {

  const [open, setOpen] = useState(true)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const ventureName=localStorage.getItem("ventureName")
  const sidebarItems = [
    { title: "Profile", path: "/venture/profile", icon: <CgProfile /> },
    { title: "Dashboard", path: "/venture/dashboard", icon: <MdSpaceDashboard /> },
    { title: "Users", path: "/venture/users", icon: <TbUsers /> },
    { title: "chats", path: "/venture/chats", icon: <IoMdChatbubbles /> },
    { title: "Feedback", path: "/venture/feedbacks", icon: <VscFeedback /> },
    { title: "Logout", path: "/admin/Logout", icon: <RiLogoutCircleRFill /> },

  ]
  const handleClik=(path)=>{
   
    if(path==="/admin/Logout"){
       dispatch(ventureLogout())
    }else navigate(path)

  }

  
  return (

    <div className={`${open ? " w-full" : "w-20"} bg-secondory not-sm:w-20 shadow-2xl h-full rounded-2xl pt-8 duration-500 text-gray-300  p-5 relative font-Outfit `} >

      <BsArrowLeftCircleFill className={`flex cursor-pointer top-9  absolute -right-3 text-3xl ${!open && "rotate-180"} duration-300  `} onClick={() => setOpen(!open)} />


      <div className="flex  p-2 rounded-2xl cursor-pointer ">

        <MdSpaceDashboard className={`text-3xl ${!open && "rotate-360"} text-gray-300 ` } />

        {
            !open ? "" :

            <li className="list-none duration-500 ">
             {ventureName}
            </li>

        }

      </div>
      <ul className="pt-2 text-gray-300  flex flex-col cursor-pointer  " >

        {sidebarItems?.map((val, index) =>

          // <Link to={val.path} >

            <li className="hover:bg-button p-3 rounded-2xl flex duration-100 "  onClick={()=>handleClik(val.path)} key={index} >

              <span className="mt-1 mr-2" >{val?.icon}</span>
              {open && <span className="md:flex hidden  " >{val.title}</span>}

            </li>

          // </Link>
        )}

      </ul>


    </div>

  )
}

export default Sidebar