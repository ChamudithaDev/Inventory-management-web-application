import { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Validation function
  function validateForm({ username, email, password, gender, mobileNumber }) {
    const errors = {};
    const nameRegex = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

    if (!username || !nameRegex.test(username)) {
      errors.username = "Name must contain only letters and spaces.";
    }
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password || !passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.";
    }
    if (!gender) {
      errors.gender = "Please select a gender.";
    }
    if (!mobileNumber || !mobileRegex.test(mobileNumber)) {
      errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
    }

    return errors;
  }

  const register = async (e) => {
    e.preventDefault();

    const formErrors = validateForm({ username, email, password, gender, mobileNumber });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await Axios.post("http://localhost/register.php", {
          name: username,
          email: email,
          password: password,
          gender: gender,
          mobileNumber: mobileNumber,
        });
        setRegisterStatus(response.data.message);
      } catch (error) {
        setRegisterStatus("Error occurred during registration.");
      }
    } else {
      setRegisterStatus("Please fix the errors above.");
    }
  };
  const imgs = [
    "https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg",
  ];
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <h2 className="text-center mb-4">Create Your Account</h2>
              <p className="text-center text-danger">{registerStatus}</p>

              <div className="form-outline mb-4">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text" id="name"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your Name"
                  required
                />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email" id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password" id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  required
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label fw-bold">Gender</label>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male" className="ms-2">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    className="ms-4"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female" className="ms-2">Female</label>
                </div>
                {errors.gender && <small className="text-danger">{errors.gender}</small>}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label fw-bold">Mobile Number</label>
                <input
                  type="text" id="mobileNumber"
                  className="form-control form-control-lg"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  required
                />
                {errors.mobileNumber && <small className="text-danger">{errors.mobileNumber}</small>}
              </div>

              <button type="submit" onClick={register} className="btn btn-primary btn-block">Sign Up</button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                  Login to your account <a href="login" className="link-danger">Login</a>
                </p>
            </form>
          </div>
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={imgs[0]} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
