import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInStructure = () => {
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleChangeUserName = (e) => {
    setInputUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputPassword("");
    setInputUserName("");
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChangeUserName}
              type="text"
              id="username"
              value={inputUserName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChangePassword}
              type="password"
              id="password"
              value={inputPassword}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignInStructure;
