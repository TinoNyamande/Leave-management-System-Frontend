import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function LandingPage () {
    const tokenExists = !!Cookies.get('token')
    if (!tokenExists) {
        return (
            <Navigate to = "/login" replace/>
        )
    }else {
        return (
            <Navigate to = "/home" replace/>
        )
    }

}
export default LandingPage