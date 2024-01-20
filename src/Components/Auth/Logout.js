import { useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";


function Logout () {

const tokenExists = !!Cookies.get('token')
  useEffect(()=>{
    //console.log(jwtDecode(Cookies.get('token'))['username']);
    Cookies.remove('token');
  },[])

    return (
        <Navigate to = "/login" replace/>
    )



    

}
export default Logout