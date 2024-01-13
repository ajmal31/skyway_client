import { useDispatch } from "react-redux"
import WalletAdmin from "../../../components/admin/wallet/Wallet"
import Sidebar from "../../../components/common/Sidebar"
const Wallet = () => {

    const dispatch=useDispatch()

    const getAdminWalletAmount=()=>{

        const apiDetails={

            method:"get",
            

        }
           
    }

    return (

        <div className="bg-admin-primary gap-5 p-7 flex w-screen h-screen" >


            <Sidebar />
            <div className="bg-admin-secondory h-full flex justify-center items-start w-10/12 rounded-3xl  shadow-2xl">

             <WalletAdmin/>

            </div>


        </div>

    )
}

export default Wallet