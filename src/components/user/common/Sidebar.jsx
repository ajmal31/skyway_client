import { Link, useNavigate } from "react-router-dom"
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { IoMdChatbubbles } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { ventureLogout } from "../../../redux/slices/ventureSlices";
import { IoMdHome } from "react-icons/io";
import { useDispatch } from "react-redux";
const Sidebar = () => {

    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sidebarItems = [
        { title: "Profile", path: "/userProfile", icon: <CgProfile /> },
        { title: "Companies", path: "/ventureList", icon: <TbUsers /> },
        { title: "chats", path: "/chats", icon: <IoMdChatbubbles /> },
        { title: "About", path: "/about", icon:<FcAbout  /> },
        { title: "contact", path: "/contact", icon: <MdContactSupport /> },
        { title: "Home", path: "/", icon: <IoMdHome /> },
        

    ]
    const handleClik = (path) => {

        if (path === "/admin/Logout") {
            dispatch(ventureLogout())
        } else navigate(path)

    }


    return (

        <div className={`${open ? " w-full" : "w-20"} bg-secondory not-sm:w-20 shadow-2xl h-full  rounded-2xl duration-500 text-gray-300  p-5 relative font-Outfit `} >

            <BsArrowLeftCircleFill className={`flex cursor-pointer top-9  absolute -right-3 text-3xl ${!open && "rotate-180"} duration-300  `} onClick={() => setOpen(!open)} />


            <div className="flex   rounded-2xl transition duration-500   cursor-pointer  ">

               
               {open && <Link to={'/'} > <img src="/logos/skyway-logo-2.png"  className="w-2/3 ml-1 " alt="" /></Link> }

               

            </div>
            <ul className="pt-2 text-gray-300  flex flex-col  cursor-pointer " >

                {sidebarItems?.map((val, index) =>

                    // <Link to={val.path} >

                    <li className="hover:bg-button p-3 rounded-2xl flex duration-100 " onClick={() => handleClik(val.path)} key={index} >

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