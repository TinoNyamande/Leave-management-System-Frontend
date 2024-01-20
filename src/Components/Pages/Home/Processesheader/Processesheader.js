import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Overlay from "../../../Layout/Overlay/Overlay";
import axios from "axios";
import Messagemodal from "../../../Layout/Messagemodal/Messagemodal";

function Processesheader(props) {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({});
  const [days, setDays] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const outlaymessage = "Applying";

  const [daysAppliedForError, setDaysAppliedForError] = useState("");
  const [leaveTypeError, setLeaveTypeError] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setShow(false);
    inputs["Username"] = jwtDecode(Cookies.get("token"))["username"];
    inputs["DaysAppliedFor"] = days;
    setLeaveTypeError("");
    setDaysAppliedForError("");
    const phonePattern = /^[0-9]{1,}$/;
    const namesPattern = /^[a-zA-Z]{3,}$/;

    if (!inputs.LeaveType) {
      console.log(inputs.LeaveType);
      setLeaveTypeError("Field cannot be empty");
      return;
    }
    if ((inputs.DaysAppliedFor == "NaN" || inputs.DaysAppliedFor < 1)) {
      console.log(days)
      setDaysAppliedForError("Enter valid start date/end date");
      return;
    }
    setIsLoading(true);

    
    setShow(false);
    try {
      const response = await axios
        .post(
          "https://localhost:7111/LeaveApplication/LeaveApplications",
          inputs
        )
        .then((response) => {
          console.log(response);
          //alert("Application saved successfully");
          setModalHeader("Success");
          setModalMessage("Application has been made successfully");
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);
          setShow(false);
          setIsLoading(false);
        })
        .catch((error) => {
          setModalHeader("Error");
          setModalMessage(error.data["message"]);
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
  };
  useEffect(() => {
    let endDate = new Date(inputs.EndDate);
    let startDate = new Date(inputs.StartDate);

    if (endDate instanceof Date && startDate instanceof Date) {
      // Calculating the difference in milliseconds
      let diffinMS = endDate.getTime() - startDate.getTime();

      // Calculating the difference in days
      let diffInDays = Math.round(diffinMS / (1000 * 3600 * 24));

      // Logging the results
      console.log("Start", startDate);
      console.log("End", endDate);
      console.log("Diff", diffInDays);
      setDays(diffInDays);
      console.log("Days", days);
    } else {
      console.log("Missing");
    }
  }, [inputs.StartDate, inputs.EndDate]);

  return (
    <div className="row">
      <div className="col-md-2">
        <Link className="processes-home-link btn btn-primary" to="/home">
          Overview
        </Link>
      </div>
      <div className="col-md-2">
        <button
          className="processes-home-link btn btn-primary"
          onClick={handleShow}
        >
          Apply for Leave
        </button>
      </div>

      <div className="col-md-3">
        <Link
          className="processes-home-link btn btn-primary"
          to="/get-my-applications"
        >
          Check Application Status
        </Link>
      </div>
      {props.isAdmin && (
        <div className="col-md-3">
          <Link
            className="processes-home-link btn btn-primary"
            to="/new-applications"
          >
            Approve Applications
          </Link>
        </div>
      )}
      {props.isAdmin && (
        <div className="col-md-2">
          <Link className="processes-home-link btn btn-primary" to="/archive">
            Archive{" "}
          </Link>
        </div>
      )}

      <Modal show={show} onHide={handleClose} size="md" className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Leave Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="leave-application-form-container"
            onSubmit={handleSubmit}
          >
            <div className="leave-application-form-box">
              <label>Leave type</label>
              <select
                className="form-select"
                name="LeaveType"
                value={inputs.LeaveType}
                onChange={handleChange}
                required
              >
                <option></option>
                <option value="Sick Leave">Sick leave</option>
                <option value="Maternity leave">Maternity leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Funeral Leave">Funeral Leave</option>
                <option value="Other">Other</option>
              </select>
              {leaveTypeError && (
                <div className="error-container">
                  <span>{leaveTypeError}</span>
                </div>
              )}
            </div>
            <div className="leave-application-form-box">
              <label>Start Date</label>
              <input
                name="StartDate"
                className="form-control"
                type="date"
                value={inputs.StartDate}
                onChange={handleChange}
              />
            </div>
            <div className="leave-application-form-box">
              <label>End Date</label>
              <input
                name="EndDate"
                className="form-control"
                type="date"
                value={inputs.EndDate}
                onChange={handleChange}
              />
            </div>
            <div className="leave-application-form-box">
              <label>Days applied for</label>
              <input
                name="DaysAppliedFor"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={days}
              />
              {daysAppliedForError && (
                <div className="error-container">
                  <span>{daysAppliedForError}</span>
                </div>
              )}
            </div>
            <div className="leave-application-form-box">
              <label>Description</label>
              <textarea
                name="Description"
                className="form-control"
                type="text"
                value={inputs.Description}
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
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

export default Processesheader;
