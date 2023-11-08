import Cookies from "js-cookie"
const Home=()=>{

    const handleClick=()=>{
        console.log('helo')
        // localStorage.removeItem('authToken')
        Cookies.remove('authToken')
    }

    return(

        <div>
            <h1>iam home </h1>
            <button onClick={handleClick}  type="submit">logout</button>
        </div>
    )
}

export default Home