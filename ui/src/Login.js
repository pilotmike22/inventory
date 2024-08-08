import React, { useState } from "react";

const LoginPage = (props) => {
  const initialFormState = { id: null, first_name: "", last_name: "", username: "", password: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.first_name || !user.last_name || !user.username || !user.password) return;

    props.addUser(user);
    setUser(initialFormState);
  };
  return (
    <div className="loginPage"> 
        <div className="signUp">
            <h1>New User Registration</h1>
                <form onSubmit={handleSubmit}>
                <div className="formgroup">
                    <label>First Name</label>
                    <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="formgroup">
                    <label> Last Name </label>
                    <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="formgroup">
                    <label> Username </label>
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
                    <label> Password</label>
                    <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <button type="submit" className="btn btn-sm btn-secondary">
                    SignUp
                </button>
                </form>
        </div>
        <br></br>
        <div className="signIn">
            <h1>Returning users</h1>
                <form onSubmit={handleSubmit}>
                <div className="formgroup">
                    <label> Username </label>
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
                    <label> Password</label>
                    <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <button type="submit" className="btn btn-sm btn-secondary">
                    LogIn
                </button>
                </form>
        </div>

    </div>
  );
};

export default LoginPage;