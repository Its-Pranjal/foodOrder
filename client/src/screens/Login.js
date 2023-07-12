import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        setError("Enter valid credentials");
        setSuccess("");
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        setError("");
        setSuccess("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred");
      setSuccess("");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}
          {success && <div className="text-success mb-3">{success}</div>}

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I am a new User
          </Link>
        </form>
      </div>
    </>
  );
};
