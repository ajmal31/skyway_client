import Dp from "./Dp"

const Contact = () => {

    const arr =[1,2,3,4,5,6,7]

    return (
        <div>
            {arr.map(() => {
                
                return (
                    
                    <div className=" flex gap-5 hover:bg-button rounded-xl " >
                        <Dp h={"h-16" } w={"w-2/12"} />
                        <div >
                            <p className=" font-semibold mt-2 " >Zarah</p>
                            <p className="" >Last Message</p>

                        </div>

                    </div>

                )
            })}

        </div>

    )
}

export default Contact