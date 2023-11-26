import { USER_SRV_BASE_URL } from "../../../data/const"
const Modal = ({visible,onClose,connectUser,id}) => {

    if(!visible) return null
     
    console.log(id)
    
    const handleOnClose=()=>onClose()

    const handleRequest=()=>connectUser(id)

    return (

        <div className="bg-secondory h-1/3  backdrop-blur-md z-50 rounded-3xl bg-opacity-30 fixed w-1/6 " >

            <div className="h-1/3 flex items-start  justify-end  ">
                <button onClick={handleOnClose} className="m-2">✖</button>
            </div>

            <div className="justify-center items-start  flex w-full h-2/ mt-2">
                <button className="border p-3 rounded-3xl hover:bg-button " onClick={handleRequest} >📞Request for a Call</button>
            </div>

        </div>
    )


}

export default Modal