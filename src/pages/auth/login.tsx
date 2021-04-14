import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "wouter";
import useLocation from "wouter/use-location";
import { logInAction } from "../../store/actions/authActions";
import "./auth.css";

interface LogInPageProps {
  logInAction: Function;
}

const LogInPage: React.FC<LogInPageProps> = ({
  logInAction,
}: LogInPageProps) => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

  const handleSubmit = () => {
    //TODO: check if email has proper format
    logInAction(email, password, () => setLocation("/"));
  };

  document.title = "maller - log in";
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <span>Log in</span>
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
        <button onClick={handleSubmit}>Log in</button>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logInAction: (email: string, password: string, redirect: Function) =>
      dispatch(logInAction(email, password, redirect)),
  };
};

export default connect(null, mapDispatchToProps)(LogInPage);
