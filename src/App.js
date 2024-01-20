import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Cookies from "js-cookie";
import Login from "./Components/Auth/Login/Login";
import ManageAccount from "./Components/Auth/ManageAccount/ManageAccount";
import ProcessesHome from "./Components/Pages/Processes/ProcessesHome";
import Register from "./Components/Auth/Register/Register";
import NotFound from "./Components/Pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import SettingsHome from "./Components/Pages/Settings/SettingsHome";
import SideBar from "./Components/Layout/SideBar/SideBar";
import NavBar from "./Components/Layout/NavBar/NavBar";
import ApplicationForm from "./Components/Pages/Processes/LeaveApplication/ApplicationForm";
import GetAllApplications from "./Components/Pages/Processes/GetAllApplications/GetAllApplications";
import LandingPage from "./Components/Pages/LandingPage";
import Logout from "./Components/Auth/Logout";
import NewApplications from "./Components/Pages/Processes/NewApplications/NewApplications";
import Approve from "./Components/Pages/Processes/Approve/Approve";
import Archive from "./Components/Pages/Processes/Archive";
import ArchiveDetails from "./Components/Pages/Processes/ArchiveDetails/ArchiveDetails";
import ReportsHomes from "./Components/Pages/Home/Reports/ReportsHome";
import LeaveApplicationReport from "./Components/Pages/Home/Reports/LeaveApplicationReport/LeaveApplicationReport";
import AppTest from "./Components/Pages/Settings/AppTest";
import BackGround from "./Components/Layout/BackGround/BackGround";
import Notauthorized from "./Components/Pages/Notauthorized/Notauthorized";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect (()=>{
    setIsLoggedIn(!!Cookies.get('token'))
  })
  return (
    <>
      <BackGround>
        <BrowserRouter>
          <div className="app-container">
            <div className="app-first-row">{isLoggedIn && <NavBar />}</div>
            <div className="app-second-row">
   
              <div className="app-second-column">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/home" element={<ProcessesHome />} />
                  <Route path="/add-user" element={<Register />} />
                  <Route path="/processes" element={<ProcessesHome />} />
                  <Route path="/unauthorized" element ={<Notauthorized/>} />
                  <Route
                    path="/leave-application"
                    element={<ApplicationForm />}
                  />
                  <Route path="/settings" element={<SettingsHome />} />
                  <Route
                    path="/get-my-applications"
                    element={<GetAllApplications />}
                  />
                  <Route
                    path="/new-applications"
                    element={<NewApplications />}
                  />
                  <Route
                    path="/new-applications-approve/:id"
                    element={<Approve />}
                  />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/reports" element={<ReportsHomes />} />
                  <Route
                    path="/leave-application-reports"
                    element={<LeaveApplicationReport />}
                  />
                  <Route path="/archive/:id" element={<ArchiveDetails />} />
                  <Route path="/test" element={<AppTest />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </BackGround>
    </>
  );
}

export default App;
