import ListVentures from "../../../components/user/ventureList/ListVentures"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
import { useParams } from "react-router-dom"
const VentureList=()=>{

    let {country}=useParams()
    let url=country ? VENTURE_SRV_BASE_URL+`/get/ventures/by/country/${country}`:VENTURE_SRV_BASE_URL+'getAllVentures'
    const obj={
        method:'post',
        url:url,
        data:{type:'allowed'},
        token:false,
        
    }
    let boolean=country ? true :false //for identify all ventures or country based ventures

    return (

        <ListVentures obj={obj} boolean={boolean} />
    )
}

export default VentureList