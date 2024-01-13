import Sidebar from "../common/Sidebar"
import Table from "../common/Table"

const ListVentures = ({obj,boolean}) => {

console.log("is it true",boolean)


  return (


    <div className="h-screen w-screen p-5 flex  gap-8 bg-primary"  >



      <div className="h-full w-2/12 shadow-2xl shadow-black">

        <Sidebar  />
      </div>

      <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">


        <Table api={obj} boolean={boolean}  />

      </div>
    </div>
  )
}

export default ListVentures