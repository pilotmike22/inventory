import React, { useState } from "react";
import SignIn from "./components/Signin";
import Registration from "./components/Register";


const LoginPage = () => {
  

  return (
    <div className="loginPage">
     <Registration />
     <br></br>
     <SignIn />
    </div>
  );
};

export default LoginPage;
