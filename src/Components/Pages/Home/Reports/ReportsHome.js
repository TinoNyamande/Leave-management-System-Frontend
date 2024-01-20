import './ReportsHome.css'
import { faArrows, faBarChart, faPlane, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';

function ReportsHomes () {
  const [isAdmin , setIsAdmin] = useState(false);
  const role = jwtDecode(Cookies.get('token'))["role"];

  useEffect (() =>{
      console.log(jwtDecode(Cookies.get('token')))
      if (role == "Admin") {
            setIsAdmin(true)
      }
      else {
        setIsAdmin(false)
      }
      

  },[role])

  const tokenExists = !!Cookies.get('token')


  if (tokenExists == false) {
    return (
        <Navigate to = "/login" replace/>
    )
}
          return (
            <div className="process-container">
                {isAdmin && <div className="report-col">
                        <h4>Leave Application Reports</h4>
                        <FontAwesomeIcon className='p-icon' icon = {faBarChart} size="8x"></FontAwesomeIcon>
                        <br></br>
                        <Link to ='/leave-application-reports'>
                           <FontAwesomeIcon className='p-action' icon={faPlay} size='2x'></FontAwesomeIcon>
                        </Link>
                </div>}
                {isAdmin && <div className="report-col">
                        <h4>Adjust leave days</h4>
                        <FontAwesomeIcon className='p-icon' icon = {faArrows} size="8x"></FontAwesomeIcon>
                        <br></br>
                        <Link to ='/leave-application-reports'>
                           <FontAwesomeIcon className='p-action' icon={faPlay} size='2x'></FontAwesomeIcon>
                        </Link>
                </div>}
                
            </div>
          )
}
export default ReportsHomes