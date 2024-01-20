import "./ProcessesHome.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Overlay from "../../Layout/Overlay/Overlay";
import Barchart from "../Barchart/Barchart";
import Piechart from "../Piechart/Piechart";
import Processesheader from "../Home/Processesheader/Processesheader";

function ProcessesHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [monthData ,setMonthData] = useState([]);
  const [monthLabels ,setMonthLabels] = useState([]);
  const [typeData ,setTypeData] = useState([]);
  const [typeLabels ,setTypeLabels] = useState([]);

  useEffect(() => {
    const tokenExists = !!Cookies.get("token");
    if (tokenExists) {
      const role = jwtDecode(Cookies.get("token"))["role"];
      if (role == "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        
      }
      const username = jwtDecode(Cookies.get("token"))["username"]
      axios
      .get(
        `https://localhost:7111/LeaveApplication/GetDaysPerMonth?Username=${
          jwtDecode(Cookies.get("token"))["username"]
        }`
      )
      .then((response) => {
        const monthDataList = [];
        const monthLabelList = [];
        const typeDataList = [];
        const typeLabelList = [];
        let daysPerMonth = response.data["daysPerMonth"]
        let daysPerType = response.data["daysPerType"]
        for (let item in daysPerType) {
            typeLabelList.push(item)
            typeDataList.push(daysPerType[item])
        }
        for (let item in daysPerMonth) {
          monthLabelList.push(item)
          monthDataList.push(daysPerMonth[item])
          
      }
      setMonthData(monthDataList)
      setMonthLabels(monthLabelList)
      setTypeData(typeDataList)
      setTypeLabels(typeLabelList)
      setIsLoading(false)
      console.log(monthLabelList)

      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
    }


  }, []);

  const tokenExists = !!Cookies.get("token");

  if (tokenExists == false) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="container processes-container">
      <div className="row">
        <div className="col-md-12">
          <Processesheader isAdmin={isAdmin} />
        </div>
      </div>
      <hr></hr>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-12 overview-header">
          <h2>Leave Overview</h2>
        </div>
      </div>
      <div className="processes-overview row">
        <div className="col-md-8">
          <Barchart labels ={monthLabels} data ={monthData} />
        </div>
        <div className="col-md-4">
          <Piechart labels={typeLabels} data={typeData} />
        </div>
        <div></div>
      </div>
      <hr />
      <br></br>
      <div className="processes-overview row">
        <div className="col-md-12">
          <h2>Notifications</h2>
        </div>
      </div>

      <Overlay outlaymessage="Applying" isLoading={isLoading} />
    </div>
  );
}
export default ProcessesHome;
