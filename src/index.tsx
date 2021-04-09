import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route } from "wouter";
import Home from "./pages/home/home";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import BasketPage from "./pages/basket/basket";
import ResultsPage from "./pages/results/results";
import Footer from "./core/footer/footer";
import Navbar from "./core/navbar/navbar";
import SignUpPage from "./pages/auth/signup";
import LogInPage from "./pages/auth/login";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="page">
        <div className="content-wrapper">
          <Navbar />
          <Route path="/">
            <Home />
          </Route>
          <Route path="/basket">
            <BasketPage />
          </Route>
          <Route path="/results/:main/:sub">
            {(params) => {
              return <ResultsPage main={params.main} sub={params.sub} />;
            }}
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
        </div>
        <Footer />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
