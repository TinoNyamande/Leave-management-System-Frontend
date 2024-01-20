import "./ApplicationForm.css";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Overlay from "../../../Layout/Overlay/Overlay";
import "bootstrap/dist/css/bootstrap.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ApplicationForm() {
  const [inputs, setInputs] = useState({});
  const outlaymessage = "Saving Application";
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function OnDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFileChange = (url) => {
    setFile(url);
  };
  useEffect(() => {
    onFileChange("");
    const token = Cookies.get("token");
    var decodedToken = jwtDecode(token);
    setUserLoggedIn(decodedToken["username"]);
  }, []);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setInputs({ ...inputs, Myfile: e.target.files[0] });
  };
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    inputs["Username"] = jwtDecode(Cookies.get("token"))["username"];
    console.log(inputs);
    const dataToSend = new FormData();
    dataToSend.append("Myfile", inputs.Myfile);
    dataToSend.append("StartDate", inputs.StartDate);
    dataToSend.append("EndDate", inputs.EndDate);
    dataToSend.append("LeaveType", inputs.LeaveType);
    dataToSend.append("Description", inputs.Description);
    dataToSend.append("Username", jwtDecode(Cookies.get("token"))["username"]);
    console.log(dataToSend);
    try {
      const response = await axios.post(
        "https://localhost:7111/LeaveApplication/LeaveApplications",
        dataToSend
      );
      console.log(response);
      alert("Application saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
    }
  };

  if (!jwtDecode(Cookies.get("token"))["username"]) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="container applicatin-form-container">
     
      <div className="row">
        <div className="col-md-12">
          <div className="application-buttons-container">
            <div className="save-button">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary bn-sm form-control"
              >
                Save
              </button>
            </div>
            <div className="cancel-button">
              <button className="btn btn-danger btn-sm form-control">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-12">
          <form className="app-form-container" onSubmit={handleSubmit}>
            <div className="app-form-upload">
              <div className="application-form-box">
                <label>Application Form</label>
                <br></br>
                <input
                  type="file"
                  name="MedicalReport"
                  onChange={handleFileChange}
                />
              </div>
              <div className="application-form-box">
                <label>Leave type</label>
                <select
                  className="form-select"
                  name="LeaveType"
                  value={inputs.LeaveType}
                  onChange={handleChange}
                >
                  <option value="Sick Leave">Sick leave</option>
                  <option value="Maternity leave">Maternity leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Funeral Leave">Funeral Leave</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="application-form-box">
                <label>Start Date</label>
                <input
                  name="StartDate"
                  className="form-control"
                  type="date"
                  value={inputs.StartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="application-form-box">
                <label>End Date</label>
                <input
                  name="EndDate"
                  className="form-control"
                  type="date"
                  value={inputs.EndDate}
                  onChange={handleChange}
                />
              </div>
              <div className="application-form-box">
                <label>Description</label>
                <textarea
                  name="Description"
                  className="form-control"
                  type="text"
                  value={inputs.Description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="document-preview">
              {file && (
                <Document file={file} onLoadSuccess={OnDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              )}
            </div>
          </form>
          
        </div>
      </div>
      <Overlay outlaymessage="Saving" isLoading={isLoading} />
    </div>
  );
}
export default ApplicationForm;
