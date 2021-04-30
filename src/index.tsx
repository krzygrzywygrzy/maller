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
import ProfilePage from "./pages/profile/profile";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ItemPage from "./pages/item/item";

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="page">
          <div className="content-wrapper">
            <Navbar />
            <Route path="/">
              <Home />
            </Route>
            <Route path="/basket">
              <BasketPage />
            </Route>
            <Route path="/results">
              <ResultsPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/login">
              <LogInPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/item/:docId">
              {(params) => {
                return <ItemPage docId={params.docId}></ItemPage>;
              }}
            </Route>
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
