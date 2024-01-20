import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const tokenExists = !!Cookies.get("token");
    if (tokenExists) {
      const role = jwtDecode(Cookies.get("token"))["role"];
      if (role == "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
       /// const url = "/unauthorized";
       //  navigate(url);
      }
    
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
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="my-nav-bar">
      <div className="box small-div">
        <h3 className="site-title">
          <span>
            <img src="/Untitled design.jpg" />
          </span>{" "}
          &copy;Tino
        </h3>
      </div>
      <div className="box large-div">
        <Link to="/home" className="navbar-main-links">Processes</Link>
        <Link to='/leave-application-reports' className="navbar-main-links">Reports</Link>
        {isAdmin && (
                    <Link to='/add-user' className="navbar-main-links">Add User</Link>

        )}
      </div>
      <div
        className={` account-dropdown box small-div ${isOpen ? "open" : ""}`}
      >
        <h3>
          {username}
          <span>
            <button className="dropdown-button" onClick={toggleDropdown}>
              <span className="dropdown-arrow">&#9776;</span>
            </button>
          </span>
        </h3>

        {isOpen && (
          <div className="dropdown-content">
            <Link to="/logout">Logout</Link>
            <Link to="/manage-account">Manage Account</Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default NavBar;
