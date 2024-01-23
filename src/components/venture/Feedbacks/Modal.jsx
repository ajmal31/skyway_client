const Modal = ({onClose,content}) => {
       console.log("content in moda",content)
    const handleOnclose=()=>onClose()
    return (
        <div className=" top-0 left-0 flex justify-center fixed h-full w-full z-50 backdrop-brightness-50 items-center font-Outfit text-gray-300"  onClick={handleOnclose} >
          <div className="bg-secondory  flex justify-center items-center rounded-xl overflow-hidden h-2/6 w-2/6 p-5 " onClick={e=>e.stopPropagation()} >
              <p>{content??"no content"}</p>
          </div>
        </div>
    )
}

export default Modal