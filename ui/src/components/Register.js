import React, { useState } from "react";
import axios from "axios";

const userEndpoint = `http://localhost:5080/post/signup`;

const Registration = () => {
  const initialFormState = { id: null, first_name: "", last_name: "", username: "", password: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.first_name || !user.last_name || !user.username || !user.password) return;

    try {
      const response = await axios.post(userEndpoint, user);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="loginPage">
      <div className="signUp">
        <h1>New User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="formgroup">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-sm btn-secondary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
