import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../../Layout/NavBar/NavBar";
import SideBar from "../../Layout/SideBar/SideBar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function Home () {
     const [decodedToken , setDecodedToken] = useState();
     const [username ,setUsername] = useState();
     const tokenExists = !!Cookies.get('token')
    
     useEffect(() => {
        axios.get(`https://localhost:7111/User/GetUser?username=${jwtDecode(Cookies.get('token'))['username']}`)
            .then(response => {
                setUsername(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    if (!jwtDecode(Cookies.get('token'))['username']) {
        return (
            <Navigate to = "/login" replace/>
        )
    }

    return (
        <>
        {tokenExists&& <NavBar name = {username}/>}
           
           <SideBar/>
           <Outlet/>
        </>
    )
}
export default Home;