import { useState } from "react";
import "./Register.css";
import axios from "axios";
import Modal from "react-modal";
import Overlay from "../../Layout/Overlay/Overlay";
import Messagemodal from "../../Layout/Messagemodal/Messagemodal";

function Register() {
  const [inputs, setInputs] = useState({});
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLaststnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const outlaymessage = "Adding user";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstnameError("");
    setLaststnameError("");
    setEmailError("");
    setPasswordError("");
    setCpasswordError("");
    setRoleError("");
    setPhoneError("");
    const namesPattern = /^[a-zA-Z]{3,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phonePattern = /^[0-9]{6,}$/;
    if (!inputs.Firstname || !namesPattern.test(inputs.Firstname)) {
      setFirstnameError("Invalid input for this field");
      return;
    }
    if (!inputs.Lastname || !namesPattern.test(inputs.Lastname)) {
      setLaststnameError("Invalid input for this field");
      return;
    }
    if (!inputs.Phone || !phonePattern.test(inputs.Phone)) {
      setPhoneError(
        "Must have digits only and should be at leats 6 characters long"
      );
      return;
    }
    if (!inputs.Email || !emailPattern.test(inputs.Email)) {
      setEmailError("Invalid input for this field");
      return;
    }
    if (!inputs.Role || !namesPattern.test(inputs.Role)) {
      setRoleError("Invalid input for this field");
      return;
    }
    if (!inputs.Password || !passwordPattern.test(inputs.Password)) {
      setPasswordError(
        "Password must be at least 8 characters long and should include an uppercase letter and a digit"
      );
      return;
    }
    if (inputs.ConfirmPassword != inputs.Password) {
      setCpasswordError("Passwords not matching");
      return;
    }
   setIsLoading(true)
    axios
      .post("https://localhost:7111/Authentication", inputs)
      .then((response) => {
         setModalHeader("Success");
         setModalMessage("User added successfully");
         setModalOpen(true);
         setTimeout(() => {
           setModalOpen(false);
         }, 2000);
         setIsLoading(false);      })
      .catch((error) => {
         setModalHeader("Error");
         setModalMessage(error.response.data["message"]);
         setModalOpen(true);
         setTimeout(() => {
           setModalOpen(false);
         }, 2000);
         setIsLoading(false);
      });
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="container register-container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 register-column">
          <form method="post" onSubmit={handleSubmit}>
            <div className="register-box">
              <label>Firstname</label>
              <input
                className="form-control"
                type="text"
                name="Firstname"
                value={inputs.Firstname || ""}
                onChange={handleChange}
              />
            </div>
            {firstnameError && (
              <div className="error-container">
                <span>{firstnameError}</span>
              </div>
            )}

            <div className="register-box">
              <label>Lastname</label>
              <input
                className="form-control"
                type="text"
                name="Lastname"
                value={inputs.Lastname || ""}
                onChange={handleChange}
              />
            </div>
            {lastnameError && (
              <div className="error-container">
                <span>{lastnameError}</span>
              </div>
            )}
            <div className="register-box">
              <label>Phone</label>
              <input
                className="form-control"
                type="text"
                name="Phone"
                value={inputs.Phone || ""}
                onChange={handleChange}
              />
            </div>
            {phoneError && (
              <div className="error-container">
                <span>{phoneError}</span>
              </div>
            )}
            <div className="register-box">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="Email"
                value={inputs.Email || ""}
                onChange={handleChange}
              />
            </div>
            {emailError && (
              <div className="error-container">
                <span>{emailError}</span>
              </div>
            )}

            <div className="register-box">
              <label>Role</label>
              <br></br>
              <select
                name="Role"
                className="form-select"
                value={inputs.Role || ""}
                onChange={handleChange}
              >
                <option></option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            {roleError && (
              <div className="error-container">
                <span>{roleError}</span>
              </div>
            )}
            <div className="register-box">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="Password"
                value={inputs.Password || ""}
                onChange={handleChange}
              />
            </div>
            {passwordError && (
              <div className="error-container">
                <span>{passwordError}</span>
              </div>
            )}
            <div className="register-box">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="ConfirmPassword"
                value={inputs.ConfirmPassword || ""}
                onChange={handleChange}
              />
            </div>
            {cpasswordError && (
              <div className="error-container">
                <span>{cpasswordError}</span>
              </div>
            )}

            <div className="register-box">
              <button className="form-control btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
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

export default Register;
