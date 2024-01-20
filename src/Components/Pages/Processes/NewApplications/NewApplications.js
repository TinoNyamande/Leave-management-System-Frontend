import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NewApplications.css";
import { Link } from "react-router-dom";
import Overlay from "../../../Layout/Overlay/Overlay";
import moment from "moment";
import Processesheader from "../../Home/Processesheader/Processesheader";
import Messagemodal from "../../../Layout/Messagemodal/Messagemodal";

function NewApplications() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const outlaymessage = "Loading";
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const onRowClick = (id) => {
    //return <Navigate to= `/new-applications-approve/${item.id}`` replace />;
    const url = `/new-applications-approve/${id}`;
    navigate(url);
  };

  useEffect(() => {
    setIsLoading(true);
    const tokenExists = !!Cookies.get("token");
    if (tokenExists) {
      const role = jwtDecode(Cookies.get("token"))["role"];
      if (role == "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        const url = "/unauthorized";
         navigate(url);
      }
      try {
        
          axios.get(`https://localhost:7111/LeaveApplication/GetAllNewApplications`)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              // Redirect to login page
              window.location.href = 'https://localhost:7111/Authentication/Login';
            }
            setModalHeader("Error");
            setModalMessage("Error loading data");
            setModalOpen(true);
            setTimeout(() => {
              setModalOpen(false);
            }, 2000);
            setIsLoading(false);
          });
      } catch (error) {
        setModalHeader("Error");
        setModalMessage("A network error occured .Please try again later");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
        setIsLoading(false);
      }
    } else {
      const url = `/login`;
      navigate(url);    }
  }, []);

  if (!jwtDecode(Cookies.get("token"))["username"]) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className=" processes-container container">
      <div className="row">
        <div className="col-md-12">
          <Processesheader isAdmin={isAdmin} />
        </div>
      </div>
      <hr></hr>
      <br></br>
      <div className="row">
        <div className="col-md-12">
          <h2 className="table-header">Approve applications</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <input type="text" placeholder="Search" className="form-control" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-sm btn-primary form-control">
            Search
          </button>
        </div>
      </div>
      <br></br>
      <div className="row table-row">
        <div className="col-md-12">
          <table className="table table-striped get-all-table ">
            <thead>
              <tr className="get-all-table-head">
                <th>Application Date</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days Applied For</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} onClick={() => onRowClick(item.id)}>
                  <td>{moment(item.applicationDate).format("D MMMM YYYY")}</td>
                  <td>{item.leaveType}</td>
                  <td>{item.status}</td>
                  <td>{moment(item.startDate).format("D MMMM YYYY")}</td>
                  <td>{moment(item.endDate).format("D MMMM YYYY")}</td>
                  <td>4</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Overlay outlaymessage={outlaymessage} isLoading={isLoading} />
      <Messagemodal
        isModalOpen={isModalOpen}
        modalHeader={modalHeader}
        modalMessage={modalMessage}
      />
    </div>
  );
}
export default NewApplications;
