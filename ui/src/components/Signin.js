import React, { useState } from "react";
import axios from "axios";

const userEndpoint = `http://localhost:5080/login`;

const SignIn = () => {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    if (!user.username || !user.password) return;

    try {
      const response = await axios.post(userEndpoint, user);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="loginPage">
      <div className="signIn">
        <h1>Returning Users</h1>
        <form onSubmit={handleSubmit}>
          <div className="formgroup">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-sm btn-secondary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
