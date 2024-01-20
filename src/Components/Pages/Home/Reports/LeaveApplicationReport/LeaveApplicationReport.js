import "./LeaveApplicationReport.css";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Overlay from "../../../../Layout/Overlay/Overlay";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Messagemodal from "../../../../Layout/Messagemodal/Messagemodal";


function LeaveApplicationReport() {
  const [inputs, setInputs] = useState({});
  const outlaymessage = "Loading";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isFormOpen , setIsFormOpen] = useState(false)
  const [show, setShow] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://localhost:7111/LeaveApplication/GetAllApplications`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setModalHeader("Error");
        setModalMessage("Error loading data");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
        setIsLoading(false);
      });
  }, []);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handlePreview = (event) => {
    event.preventDefault();
    setShow(false)
    setIsLoading(true);
    setData([]);
    var usernameValue = inputs.username;
    var statusValue = inputs.status;
    var leaveTypeValue = inputs.leaveType;
    if (usernameValue == undefined) {
      usernameValue = null;
    }

    if (statusValue == undefined) {
      statusValue = null;
    }

    if (leaveTypeValue == undefined) {
      leaveTypeValue = null;
    }

    axios
      .get(`https://localhost:7111/LeaveApplication/GetApplicationBy`, {
        params: {
          Id: null,
          Username: usernameValue,
          Status: statusValue,
          LeaveType: leaveTypeValue,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (!jwtDecode(Cookies.get("token"))["username"]) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 reports-header">
             <h2>Leave applications reports</h2>
        </div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-12">
           <button onClick={handleShow} className="btn btn-primary btn-sm form-control">Filter</button>
        </div>
      </div>
      <div className="row report-row">
        <div className="col-md-12">  
        <table className="table table-striped report-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Application Date</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{moment(item.applicationDate).format("YYYY-MM-DD")}</td>
                <td>{item.leaveType}</td>
                <td>{item.status}</td>
                <td>{moment(item.startDate).format("YYYY-MM-DD")}</td>
                <td>{moment(item.endDate).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handlePreview}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={inputs.username || null}
            className="form-control"
          />
          <br></br>
          <label>Leave Type</label>
          <input
            type="text"
            name="leaveType"
            onChange={handleChange}
            value={inputs.leaveType || null}
            className="form-control"
          />
          <br></br>

          <label>Status</label>
          <select
            className="form-select"
            name="status"
            onChange={handleChange}
            value={inputs.status || ""}
          >
            <option></option>
            <option name="NEW">NEW</option>
            <option name="APPROVED">APPROVED</option>
            <option name="REJECTED">REJECTED</option>
          </select>
          <br></br>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePreview}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      <Overlay outlaymessage={outlaymessage} isLoading={isLoading} />
      <Messagemodal
        isModalOpen={isModalOpen}
        modalHeader={modalHeader}
        modalMessage={modalMessage}
      />
    </div>
  );
}
export default LeaveApplicationReport;
