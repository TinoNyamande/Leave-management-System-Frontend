import "./NewNavbar.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react";

function NewNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState();
    const tokenExists = !!Cookies.get("token");
    useEffect(() => {
      if (tokenExists) {
        axios
          .get(
            `https://localhost:7111/User/GetUser?username=${
              jwtDecode(Cookies.get("token"))["username"]
            }`
          )
          .then((response) => {
            setUsername(response.data["userInfo"]["firstname"]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else console.log("No token");
    }, [tokenExists]);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }
    ;
  return (
    
<div className="navbar-container">
      <div className="navbar-left-section">
        <span>&copy; Tinotenda Nyamande</span>
      </div>
      <div className="navbar-middle-section"></div>
      <div className="navbar-right-section">
        <div className="navbar-dropdown">
          <span className="span-menu" onClick={toggleDropdown}>
            &#9776;
          </span>

          <div className="navbar-dropdown-content" id="myDropdown">
            <hr></hr>
            <Link className="navbar-dropdown-content-link" to="/">
              Home &#10139;
            </Link>
            <Link className="navbar-dropdown-content-link" to="/">
              Projects
            </Link>
            <Link className="navbar-dropdown-content-link" to="/">
              Github
            </Link>
            <Link className="navbar-dropdown-content-link" to="/">
              Linked In
            </Link>
            <Link className="navbar-dropdown-content-link" to="/">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNavbar