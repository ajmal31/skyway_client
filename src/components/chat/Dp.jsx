const Dp = ({ h, w,image }) => {
    console.log("image",image)
    return (
        


            <div className={` ${h, w}  rounded-full overflow-hidden `} >
                <img src={image??`/temp/venture-contact-dp.png`} className="h-full w-full" alt="Venture_Contact_Image" />
            </div>
        
    )


}

export default Dp