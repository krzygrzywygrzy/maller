import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "wouter";
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

  const handleSubmit = () => {
    //TODO: check if email has proper format
    signUpAction(email, password);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <span>Sign Up</span>
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
    signUpAction: (email: string, password: string) =>
      dispatch(signUpAction(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpPage);
