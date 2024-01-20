import { Link } from "react-router-dom"
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaGoogleWallet } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/slices/adminSlice";
const Sidebar = () => {

  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  //Admin logout
  const logOutAdmin = ()=>dispatch(adminLogout())
  const sidebarItems = [

    { title: "Dashboard", path: "/admin", icon: <MdSpaceDashboard /> },
    { title: "Users", path: "/admin/users", icon: <TbUsers /> },
    { title: "Ventures", path: "/admin/ventures", icon: <FaHandshake /> },
    { title: "Wallet", path: "/admin/wallet", icon: <FaGoogleWallet /> },
    { title: "History", path: "/admin/paymentHistory", icon: <GiTakeMyMoney /> },
    { title: "Feedback", path: "/admin/settings", icon: <VscFeedback /> },

  ]

  return (

    <div className={`${open ? " w-2/12" : "w-20"} bg-admin-secondory not-sm:w-20 shadow-2xl rounded-2xl pt-8 duration-500  p-5 relative font-Outfit `} >

      <BsArrowLeftCircleFill className={`flex cursor-pointer top-9  absolute -right-3 text-3xl ${!open && "rotate-180"} duration-300  `} onClick={() => setOpen(!open)} />


      <div className="flex  p-2 rounded-2xl cursor-pointer ">

        <MdSpaceDashboard className={`text-3xl ${!open && "rotate-360"}  `} />

        {
          !open ? "" :

            <li className="list-none duration-500 ">
              Skyway
            </li>

        }

      </div>
      <ul className="pt-2 text-gray-500  flex flex-col cursor-pointer  " >

        {sidebarItems?.map((val, index) =>

          <Link to={val.path} >

            <li className="hover:bg-admin-primary p-3 rounded-2xl flex duration-100 " key={index} >

              <span className="mt-1 mr-2" >{val?.icon}</span>
              {open && <span className="md:flex hidden  " >{val.title}</span>}

            </li>

          </Link>
        )}
        <li className="hover:bg-admin-primary p-3 rounded-2xl flex duration-100 " onClick={logOutAdmin}  >

          <span className="mt-1 mr-2" ><RiLogoutCircleRFill /></span>
          {open && <span className="md:flex hidden  " >Logout</span>}

        </li>

      </ul>


    </div>

  )
}

export default Sidebar