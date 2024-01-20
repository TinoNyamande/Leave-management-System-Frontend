import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import "./Login.css";
import Overlay from "../../Layout/Overlay/Overlay";
import Modal from "react-modal";

function Login() {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const outlaymessage = "Signing in";

  useEffect(() => {
    if (isModalOpen) {
      const timeoutId = setTimeout(() => {
        closeModal();
      }, 3000); // Auto-close after 5 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(creds)
    setEmailError("");
    setPasswordError("");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!creds.userName || !emailPattern.test(creds.userName)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!creds.password || !passwordPattern.test(creds.password)) {
      setPasswordError("Invalidpassword");
      return;
    }
    setIsLoading(true);

    axios
      .post("https://localhost:7111/Account/Login", creds)
      .then((res) => {
        //alert("Logged in successfully")
        const token = res.data.token;
        Cookies.set("token", token, { expires: 7, secure: true });
        setIsLoading(false);
        setModalHeader("Success");
        setModalMessage("Logged in successfully");
        setModalOpen(true);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        console.log("Error" + error.response.data["message"])
        setIsLoading(false);
        try {
          setModalHeader("Error");
          setModalMessage(error.response.data["message"]);
          setModalOpen(true);
        } catch (error) {
          setModalHeader("Error");
          setModalMessage("A network error occured. Please try again later");
          setModalOpen(true);
        }
      });
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 login-column">
          <div className="login-header-container">
            <img src="/Untitled design.jpg" />
          </div>
          <div>
            <h3>Leave Management System</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-box">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="userName"
                onChange={(e) =>
                  setCreds({ ...creds, userName: e.target.value })
                }
              />
              {emailError && (
                <div className="error-container">
                  <span>{emailError}</span>
                </div>
              )}
            </div>
            <div className="login-box">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
              {passwordError && (
                <div className="error-container">
                  <span>{passwordError}</span>
                </div>
              )}
            </div>
            <div className="login-box">
              <button className="form-control btn btn-primary" type="submit">
                Log in
              </button>
              <Overlay outlaymessage={outlaymessage} isLoading={isLoading} />
            </div>
            <div className="forgot-password">
              <Link className="forgot-password">Forgot password?</Link>
            </div>
          </form>
        </div>
        <Modal
          className="login-modal"
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
        >
          <h2>{modalHeader}</h2>
          <p>{modalMessage}</p>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
