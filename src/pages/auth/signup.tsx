import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "wouter";
import User from "../../models/user";
import { signUpAction } from "../../store/actions/authActions";
import "./auth.css";

interface LogInPageProps {
  signUpAction(password: string, user: User, redirect: any);
}

const SignUpPage: React.FC<LogInPageProps> = ({
  signUpAction,
}: LogInPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");

  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

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
