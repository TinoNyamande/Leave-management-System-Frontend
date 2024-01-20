import "./ArchiveDetails.css";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Overlay from "../../../Layout/Overlay/Overlay";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ArchiveDetails({ match }) {
  // const itemId = match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const outlaymessage = "Updating application ...";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function convertFromBase64(base64String, fileName, mimeType) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }

  useEffect(() => {
    console.log("Id :", id);
    axios
      .get(
        `https://localhost:7111/LeaveApplication/GetApplicationById?Id=${id}`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        const base64StringInput = response.data.myfile;
        const fileNameInput = response.data.fileName;
        const mimeTypeInput = "application/pdf";
        const fileInput = convertFromBase64(
          base64StringInput,
          fileNameInput,
          mimeTypeInput
        );
        setFile(fileInput);
        console.log("File" + file);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function OnDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!jwtDecode(Cookies.get("token"))["username"]) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="container applicatin-form-container">
      <div className="row">
        <div className="col-md-12">
          <div className="archive-header-container">
            <h2>{data.username}</h2>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-12">
          <div className="app-form-container">
            <div className="archive-form-upload">
              <div className="app-form-box">
                <label>Uploaded File</label>
                <br></br>
                <input
                  type="text"
                  name="MedicalReport"
                  value={data.fileName}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="app-form-box">
                <label>Leave type</label>
                <input
                  name="EndDate"
                  className="form-control"
                  type="date"
                  value={data.leaveType}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>Start Date</label>
                <input
                  name="StartDate"
                  className="form-control"
                  type="text"
                  value={data.startDate}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>End Date</label>
                <input
                  name="EndDate"
                  className="form-control"
                  type="text"
                  value={data.endDate}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>Status</label>
                <input
                  name="EndDate"
                  className="form-control"
                  type="text"
                  value={data.status}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>Description</label>
                <textarea
                  name="Description"
                  readOnly
                  className="form-control"
                  type="text"
                  value={data.description}
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

            <div className="app-form-box">
              <Overlay outlaymessage={outlaymessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <Overlay outlaymessage="Saving" isLoading={isLoading} />
    </div>
  );
}
export default ArchiveDetails;
