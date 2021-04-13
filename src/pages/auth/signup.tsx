import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "wouter";
import User from "../../interfaces/user";
import { signUpAction } from "../../store/actions/authActions";
import "./auth.css";

interface LogInPageProps {
  signUpAction: Function;
}

const SignUpPage: React.FC<LogInPageProps> = ({
  signUpAction,
}: LogInPageProps) => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [surname, setSurname] = useState<String>("");

  const [location, setLocation] = useLocation();

  const handleSubmit = () => {
    //TODO: check if data is correct
    signUpAction(password, { name: name, surname: surname, email: email }, () =>
      setLocation("/")
    );
  };

  document.title = "maller - sign up";
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <span>Sign Up</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="surname"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
        <Link href="/login">Log in</Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signUpAction: (password: string, user: User, redirect: Function) =>
      dispatch(signUpAction(password, user, redirect)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpPage);
