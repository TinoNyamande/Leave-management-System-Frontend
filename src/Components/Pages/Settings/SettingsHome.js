import './SettingsHome.css'
import { Link } from 'react-router-dom';
import { faPlane, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function SettingsHome () {
  const tokenExists = !!Cookies.get('token')
  if (tokenExists == false) {
    return (
        <Navigate to = "/login" replace/>
    )
}

          return (
             <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <button className='btn btn-sm btn-secondary'>
                  <Link to="add-user">Add User
                        </Link>
                  </button>
                </div>
              </div>
             </div>
          )
}
export default SettingsHome