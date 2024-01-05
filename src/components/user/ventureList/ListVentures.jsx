import Sidebar from "../common/Sidebar"
import Table from "../common/Table"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
const ListVentures = () => {

  const obj={
    method:'post',
    url:VENTURE_SRV_BASE_URL+'getAllVentures',
    data:{type:'allowed'},
    token:false,
    
}


  return (


    <div className="h-screen w-screen p-5 flex  gap-8 bg-primary"  >



      <div className="h-full w-2/12 shadow-2xl shadow-black">

        <Sidebar  />
      </div>

      <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8   bg-secondory">


        <Table api={obj} />

      </div>
    </div>
  )
}

export default ListVentures