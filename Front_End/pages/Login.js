import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimg from "./login.png";
import Axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [capval, setCapval] = useState(null);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    //  hardcoded credentials
    if (email === "chamu@gmail.com" && password === "Chamma@1234") {
      alert("Welcome, Chamu!");
      navigate("/home");
      return;
    }

    try {
      const response = await Axios.post("http://localhost/login.php", {
        email: email,
        password: password,
      });

      if (response.data.message === "Login successful") {
        alert("Welcome, " + response.data.user.name);
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error occurred during login.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={loginimg} alt="" className="img-fluid " />
          </div>
          <div
            className="col-md-10 col-lg-8 col-xl-6 offset-xl-1 rounded shadow-lg p-4"
            style={{ backgroundColor: "rgba(245,255,255, 0.7)" }}
          >
            <form onSubmit={login} className="p-4">
              <div className="row justify-content-center">
                <div className="col">
                  <p
                    className="lead fw-bold mb-0 me-3 text-center"
                    style={{ fontSize: "30px" }}
                  >
                    Login
                  </p>
                </div>
              </div>
              <h1
                style={{
                  color: "red",
                  fontSize: "15px",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {error && error}
              </h1>
              <div className="form-outline mb-4"></div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <ReCAPTCHA
                  sitekey="6Lc1_Y0qAAAAAHWj2-hGUzF2zGoWxg0zlZOKXpEj"
                  onChange={(value) => setCapval(value)}
                />
                <button
                  disabled={!capval}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => navigate("/Signup")}
                >
                  signup
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
