import "./Approve.css";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Overlay from "../../../Layout/Overlay/Overlay";
import Processesheader from "../../Home/Processesheader/Processesheader";
import moment from "moment";
import Messagemodal from "../../../Layout/Messagemodal/Messagemodal";

function Approve({ match }) {
  // const itemId = match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const outlaymessage = "Updating application ...";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
      .get(
        `https://localhost:7111/LeaveApplication/GetApplicationById?Id=${id}`
      )
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setModalHeader("Error");
        setModalMessage("Error loading data. Try again later");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
        setIsLoading(false);
      });
    }catch (error) {
      setModalHeader("Error");
      setModalMessage("A network error occured .Please try again later");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
      setIsLoading(false);
    }

  }, []);

  function onApprove() {
    setIsLoading(true);
    try {
      axios
        .post(
          `https://localhost:7111/LeaveApplication/ApproveApplication?applicationId=${id}`
        )
        .then((response) => {
          setIsLoading(false);
          setModalHeader("Success");
          setModalMessage("Application has been approved successfully");
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);
          setIsLoading(false);
          setTimeout(()=>{
            navigate("/new-applications");
          },2000)
          
        })
        .catch((error) => {
          setIsLoading(false);
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
  }

  function onReject() {
    setIsLoading(true);
    try {
      axios
        .post(
          `https://localhost:7111/LeaveApplication/RejectApplication?applicationId=${id}`
        )
        .then((response) => {
          setIsLoading(false);
          setModalHeader("Success");
          setModalMessage("Application has been rejected successfully");
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);
          setIsLoading(false);
          setTimeout(()=>{
            navigate("/new-applications");
          },2000)        })
        .catch((error) => {
          setModalHeader("Error");
          setModalMessage(error.data["message"]);
          setIsLoading(false);

          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);

          navigate("/new-applications");
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
  }

  if (!jwtDecode(Cookies.get("token"))["username"]) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="processes-container container">
      <div className="row">
        <div className="col-md-12">
          <Processesheader isAdmin={true} />
        </div>
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-md-6">
          <button
            onClick={onApprove}
            type="submit"
            className="btn btn-primary bn-sm form-control"
          >
            Approve
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-danger btn-sm form-control"
            onClick={onReject}
          >
            Reject
          </button>
        </div>
      </div>
      <br></br>

      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <td>Applicant</td>
                <td>{data.username}</td>
              </tr>
              <tr>
                <td>Leave days available</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Total days taken this year</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Date of application</td>
                <td>{data.dateOfApplication}</td>
              </tr>
              <tr>
                <td>Leave Type</td>
                <td>{data.leaveType}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{moment(data.startDate).format("D MMMM YYYY")}</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>{moment(data.endDate).format("D MMMM YYYY")}</td>
              </tr>
              <tr>
                <td>Total working days</td>
                <td>{data.totalDays}</td>
              </tr>
            </thead>
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
export default Approve;
